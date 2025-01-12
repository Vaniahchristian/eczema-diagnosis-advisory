const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// In-memory storage for demo purposes
// In production, use a proper database
const users = new Map();
const conversations = new Map();
const appointments = new Map();
const onlineDoctors = new Set();

// Middleware to authenticate socket connections
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.user.id);

  // Join user's room
  socket.on('join', ({ userId, role }) => {
    socket.join(userId);
    users.set(socket.user.id, {
      socketId: socket.id,
      role,
      userId,
    });

    if (role === 'doctor') {
      onlineDoctors.add(userId);
      io.emit('online_doctors', Array.from(onlineDoctors));
    }
  });

  // Handle messages
  socket.on('send_message', async (data) => {
    const { conversationId, content, timestamp, file } = data;
    const message = {
      id: Date.now().toString(),
      sender: socket.user.id,
      content,
      timestamp,
      delivered: false,
      read: false,
      ...(file && { file }),
    };

    // Store message
    if (!conversations.has(conversationId)) {
      conversations.set(conversationId, []);
    }
    conversations.get(conversationId).push(message);

    // Get recipient
    const [user1, user2] = conversationId.split('-');
    const recipientId = user1 === socket.user.id ? user2 : user1;
    const recipient = users.get(recipientId);

    if (recipient) {
      io.to(recipient.socketId).emit('message', {
        conversationId,
        message,
      });
    }

    // Send delivery confirmation
    socket.emit('message_status', {
      messageId: message.id,
      status: 'sent',
    });
  });

  // Handle typing indicators
  socket.on('typing', ({ conversationId, isTyping }) => {
    const [user1, user2] = conversationId.split('-');
    const recipientId = user1 === socket.user.id ? user2 : user1;
    const recipient = users.get(recipientId);

    if (recipient) {
      io.to(recipient.socketId).emit('typing', {
        conversationId,
        isTyping,
        user: socket.user.id,
      });
    }
  });

  // Handle appointments
  socket.on('book_appointment', async (data, callback) => {
    const { doctorId, date, type } = data;
    
    try {
      // Check if slot is available
      const doctorAppointments = appointments.get(doctorId) || [];
      const isSlotTaken = doctorAppointments.some(apt => 
        new Date(apt.date).getTime() === new Date(date).getTime()
      );

      if (isSlotTaken) {
        callback({ success: false, error: 'Time slot not available' });
        return;
      }

      // Create appointment
      const appointment = {
        id: Date.now().toString(),
        doctorId,
        patientId: socket.user.id,
        date,
        type,
        status: 'scheduled',
      };

      // Store appointment
      if (!appointments.has(doctorId)) {
        appointments.set(doctorId, []);
      }
      appointments.get(doctorId).push(appointment);

      // Notify doctor
      const doctor = users.get(doctorId);
      if (doctor) {
        io.to(doctor.socketId).emit('appointment_update', {
          type: 'new',
          appointment,
        });
      }

      // Notify patient
      socket.emit('appointment_update', {
        type: 'new',
        appointment,
      });

      callback({ success: true, appointment });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // Handle appointment cancellation
  socket.on('cancel_appointment', async (data, callback) => {
    const { appointmentId } = data;
    
    try {
      // Find appointment
      let found = false;
      for (const [doctorId, doctorAppointments] of appointments.entries()) {
        const appointmentIndex = doctorAppointments.findIndex(apt => apt.id === appointmentId);
        
        if (appointmentIndex !== -1) {
          const appointment = doctorAppointments[appointmentIndex];
          
          // Check if user has permission to cancel
          if (appointment.patientId !== socket.user.id && appointment.doctorId !== socket.user.id) {
            callback({ success: false, error: 'Unauthorized' });
            return;
          }

          // Update appointment status
          appointment.status = 'cancelled';
          appointment.cancelledBy = socket.user.id;
          appointment.cancelledAt = new Date();

          // Notify doctor
          const doctor = users.get(appointment.doctorId);
          if (doctor) {
            io.to(doctor.socketId).emit('appointment_update', {
              type: 'cancelled',
              appointment,
            });
          }

          // Notify patient
          const patient = users.get(appointment.patientId);
          if (patient) {
            io.to(patient.socketId).emit('appointment_update', {
              type: 'cancelled',
              appointment,
            });
          }

          callback({ success: true, appointment });
          found = true;
          break;
        }
      }

      if (!found) {
        callback({ success: false, error: 'Appointment not found' });
      }
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // Handle conversation history requests
  socket.on('get_conversation_history', ({ conversationId }, callback) => {
    try {
      const messages = conversations.get(conversationId) || [];
      callback({ success: true, messages });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.id);
    
    const user = users.get(socket.user.id);
    if (user?.role === 'doctor') {
      onlineDoctors.delete(user.userId);
      io.emit('online_doctors', Array.from(onlineDoctors));
    }
    
    users.delete(socket.user.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

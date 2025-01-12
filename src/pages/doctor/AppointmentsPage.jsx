import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    patientId: '123',
    dateTime: new Date('2025-01-15T10:00:00'),
    status: 'pending',
    type: 'Initial Consultation',
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    patientId: '124',
    dateTime: new Date('2025-01-16T14:30:00'),
    status: 'confirmed',
    type: 'Follow-up',
  },
];

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [newDateTime, setNewDateTime] = useState(null);

  const handleAcceptAppointment = (appointmentId) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'confirmed' } : apt
    ));
    // TODO: Implement notification to patient
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    ));
    // TODO: Implement notification to patient
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDateTime(appointment.dateTime);
    setIsRescheduleDialogOpen(true);
  };

  const handleRescheduleConfirm = () => {
    if (selectedAppointment && newDateTime) {
      setAppointments(appointments.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, dateTime: newDateTime, status: 'rescheduled' }
          : apt
      ));
      // TODO: Implement notification to patient
      setIsRescheduleDialogOpen(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'rescheduled':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>
                  {appointment.dateTime.toLocaleString()}
                </TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {appointment.status === 'pending' && (
                    <>
                      <IconButton
                        color="success"
                        onClick={() => handleAcceptAppointment(appointment.id)}
                        title="Accept"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        title="Cancel"
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  )}
                  {appointment.status !== 'cancelled' && (
                    <IconButton
                      color="primary"
                      onClick={() => handleReschedule(appointment)}
                      title="Reschedule"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isRescheduleDialogOpen} onClose={() => setIsRescheduleDialogOpen(false)}>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="New Date & Time"
              value={newDateTime}
              onChange={setNewDateTime}
              renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRescheduleDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRescheduleConfirm} variant="contained">
            Confirm Reschedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentsPage;

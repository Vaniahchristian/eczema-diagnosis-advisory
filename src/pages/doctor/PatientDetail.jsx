import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  VideoCall as VideoCallIcon,
  Message as MessageIcon,
  CalendarToday as CalendarIcon,
  History as HistoryIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

// Mock data for demonstration
const mockPatientData = {
  id: 1,
  name: 'John Doe',
  age: 35,
  gender: 'Male',
  email: 'john.doe@email.com',
  phone: '+1 234 567 8900',
  condition: 'Atopic Dermatitis',
  severity: 'Moderate',
  lastVisit: '2025-01-10',
  nextAppointment: '2025-01-15',
  diagnosisHistory: [
    {
      date: '2025-01-10',
      severity: 'Moderate',
      symptoms: ['Redness', 'Itching', 'Dryness'],
      triggers: ['Stress', 'Weather changes'],
      notes: 'Patient reports increased stress at work',
      images: ['image1.jpg', 'image2.jpg'],
    },
    // Add more history entries
  ],
  medications: [
    {
      name: 'Topical Corticosteroid',
      dosage: '1% cream',
      frequency: 'Twice daily',
      startDate: '2025-01-10',
      endDate: '2025-01-24',
    },
    // Add more medications
  ],
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PatientDetail = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ width: 80, height: 80, mr: 2 }}
                src="/path-to-patient-image.jpg"
              />
              <Box>
                <Typography variant="h4">{mockPatientData.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {mockPatientData.age} years • {mockPatientData.gender}
                </Typography>
                <Chip
                  label={mockPatientData.condition}
                  color="primary"
                  sx={{ mr: 1, mt: 1 }}
                />
                <Chip
                  label={mockPatientData.severity}
                  color={
                    mockPatientData.severity === 'Severe' ? 'error' :
                    mockPatientData.severity === 'Moderate' ? 'warning' : 'success'
                  }
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<VideoCallIcon />}
              >
                Start Consultation
              </Button>
              <Button
                variant="outlined"
                startIcon={<MessageIcon />}
              >
                Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" icon={<AssignmentIcon />} iconPosition="start" />
          <Tab label="Diagnosis History" icon={<HistoryIcon />} iconPosition="start" />
          <Tab label="Treatment Plan" icon={<CalendarIcon />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Patient Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={mockPatientData.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary={mockPatientData.phone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Last Visit"
                        secondary={mockPatientData.lastVisit}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Next Appointment"
                        secondary={mockPatientData.nextAppointment}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Medications
                  </Typography>
                  <List dense>
                    {mockPatientData.medications.map((med, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={med.name}
                          secondary={`${med.dosage} - ${med.frequency}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Doctor's Notes
                    </Typography>
                    <IconButton onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={notes}
                    onChange={handleNotesChange}
                    disabled={!isEditing}
                    placeholder="Add your notes here..."
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {mockPatientData.diagnosisHistory.map((diagnosis, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Diagnosis - {diagnosis.date}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="subtitle1" gutterBottom>
                          Severity: {diagnosis.severity}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Symptoms: {diagnosis.symptoms.join(', ')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Triggers: {diagnosis.triggers.join(', ')}
                        </Typography>
                        <Typography variant="body1">
                          Notes: {diagnosis.notes}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {diagnosis.images.map((image, imgIndex) => (
                            <Card key={imgIndex} sx={{ width: 120 }}>
                              <CardMedia
                                component="img"
                                height="120"
                                image={`/path-to-images/${image}`}
                                alt={`Diagnosis image ${imgIndex + 1}`}
                              />
                            </Card>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Treatment Plan
                  </Typography>
                  {/* Add treatment plan content */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PatientDetail;

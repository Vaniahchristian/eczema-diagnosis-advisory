import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Memory as CpuIcon,
  Storage as StorageIcon,
  NetworkCheck as NetworkIcon,
  People as UsersIcon,
  LocalHospital as DiagnosisIcon,
  Event as AppointmentIcon,
  Speed as LoadIcon,
  ArrowUpward as IncreaseIcon,
  ArrowDownward as DecreaseIcon,
} from '@mui/icons-material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ title, value, icon, trend, trendValue, color }) => {
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
            }}
          >
            {React.cloneElement(icon, { sx: { color: color } })}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend === 'up' ? (
            <IncreaseIcon sx={{ color: 'success.main', mr: 1 }} />
          ) : (
            <DecreaseIcon sx={{ color: 'error.main', mr: 1 }} />
          )}
          <Typography
            variant="body2"
            sx={{ color: trend === 'up' ? 'success.main' : 'error.main' }}
          >
            {trendValue}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const SystemHealthCard = () => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="System Health" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                CPU Usage
              </Typography>
              <Typography variant="h6">45%</Typography>
              <LinearProgress variant="determinate" value={45} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Memory Usage
              </Typography>
              <Typography variant="h6">62%</Typography>
              <LinearProgress variant="determinate" value={62} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Storage Usage
              </Typography>
              <Typography variant="h6">78%</Typography>
              <LinearProgress variant="determinate" value={78} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Network Status
              </Typography>
              <Typography variant="h6">Good</Typography>
              <LinearProgress variant="determinate" value={90} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const AnalyticsDashboard = () => {
  const theme = useTheme();
  
  // Mock data - replace with real data from your backend
  const ageDistributionData = {
    labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '50+'],
    datasets: [{
      label: 'Number of Patients',
      data: [65, 45, 35, 55, 40, 30],
      backgroundColor: theme.palette.primary.light,
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    }]
  };

  const geographicalData = {
    labels: ['Central', 'Eastern', 'Northern', 'Western'],
    datasets: [{
      data: [300, 250, 200, 150],
      backgroundColor: [
        theme.palette.primary.light,
        theme.palette.secondary.light,
        theme.palette.success.light,
        theme.palette.info.light,
      ],
      borderColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.info.main,
      ],
      borderWidth: 1,
    }]
  };

  const treatmentData = {
    labels: ['Topical Corticosteroids', 'Moisturizers', 'Antihistamines', 'Phototherapy', 'Immunosuppressants'],
    datasets: [{
      label: 'Times Recommended',
      data: [120, 150, 80, 40, 30],
      backgroundColor: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.main,
      borderWidth: 1,
    }]
  };

  const confidenceScoreData = {
    labels: ['90-100%', '80-89%', '70-79%', '60-69%', '<60%'],
    datasets: [{
      label: 'Number of Diagnoses',
      data: [45, 65, 35, 20, 10],
      backgroundColor: theme.palette.info.light,
      borderColor: theme.palette.info.main,
      borderWidth: 1,
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Age Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Age Distribution" />
            <CardContent sx={{ height: 300 }}>
              <Bar 
                data={ageDistributionData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Eczema Prevalence by Age Group'
                    }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Geographical Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Geographical Distribution" />
            <CardContent sx={{ height: 300 }}>
              <Pie 
                data={geographicalData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Patient Distribution by Region'
                    }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Treatment Recommendations Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Most Recommended Treatments" />
            <CardContent sx={{ height: 300 }}>
              <Bar 
                data={treatmentData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Treatment Recommendation Frequency'
                    }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Model Confidence Scores Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Model Confidence Distribution" />
            <CardContent sx={{ height: 300 }}>
              <Line 
                data={confidenceScoreData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'AI Model Confidence Scores'
                    }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="2,457"
            icon={<UsersIcon />}
            trend="up"
            trendValue="+12% this month"
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Diagnoses Today"
            value="48"
            icon={<DiagnosisIcon />}
            trend="up"
            trendValue="+8% today"
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Appointments"
            value="32"
            icon={<AppointmentIcon />}
            trend="down"
            trendValue="-3% this week"
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="System Load"
            value="65%"
            icon={<LoadIcon />}
            trend="up"
            trendValue="+5% this hour"
            color={theme.palette.info.main}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SystemHealthCard />
        </Grid>

        <Grid item xs={12}>
          <AnalyticsDashboard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

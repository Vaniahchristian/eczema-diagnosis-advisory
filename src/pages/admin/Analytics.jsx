import React, { useState, useEffect } from 'react';
import { getAdminAnalytics } from '../../services/analytics';
import { Box, Card, CardContent, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, MapChart, PieChart } from '../../components';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [timeRange, setTimeRange] = useState('1month');
    const [viewType, setViewType] = useState('system'); // system, users, or diagnosis

    useEffect(() => {
        const fetchAnalytics = async () => {
            const data = await getAdminAnalytics(timeRange);
            setAnalytics(data);
        };
        fetchAnalytics();
    }, [timeRange]);

    if (!analytics) return <div>Loading analytics...</div>;

    const renderSystemMetrics = () => (
        <>
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>System Uptime</Typography>
                            <Typography variant="h5">{analytics.systemMetrics.uptime}</Typography>
                            <Typography variant="body2" color="success.main">
                                {analytics.systemMetrics.uptimePercentage}% availability
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>API Response Time</Typography>
                            <Typography variant="h5">{analytics.systemMetrics.avgResponseTime}ms</Typography>
                            <Typography variant="body2" color={analytics.systemMetrics.responseTimeStatus === 'good' ? 'success.main' : 'error.main'}>
                                {analytics.systemMetrics.responseTimeStatus}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Error Rate</Typography>
                            <Typography variant="h5">{analytics.systemMetrics.errorRate}%</Typography>
                            <Typography variant="body2" color={analytics.systemMetrics.errorRate < 1 ? 'success.main' : 'error.main'}>
                                {analytics.systemMetrics.errorTrend}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>ML Model Performance</Typography>
                            <Typography variant="h5">{analytics.systemMetrics.mlAccuracy}%</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Accuracy Rate
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>System Load Over Time</Typography>
                    <Box height={300}>
                        <BarChart 
                            data={analytics.systemMetrics.loadHistory}
                            xAxis="timestamp"
                            yAxis="load"
                            title="System Load"
                        />
                    </Box>
                </CardContent>
            </Card>
        </>
    );

    const renderUserMetrics = () => (
        <>
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total Users</Typography>
                            <Typography variant="h5">{analytics.userMetrics.totalUsers}</Typography>
                            <Typography variant="body2" color="success.main">
                                +{analytics.userMetrics.userGrowth}% this month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Active Users</Typography>
                            <Typography variant="h5">{analytics.userMetrics.activeUsers}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {analytics.userMetrics.activeUsersPercentage}% of total
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>New Registrations</Typography>
                            <Typography variant="h5">{analytics.userMetrics.newUsers}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Last 30 days
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>User Satisfaction</Typography>
                            <Typography variant="h5">{analytics.userMetrics.satisfaction}/5</Typography>
                            <Typography variant="body2" color="success.main">
                                Based on feedback
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>User Activity Distribution</Typography>
                    <Box height={300}>
                        <PieChart 
                            data={analytics.userMetrics.activityDistribution}
                            title="User Activities"
                        />
                    </Box>
                </CardContent>
            </Card>
        </>
    );

    const renderDiagnosisMetrics = () => (
        <>
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total Diagnoses</Typography>
                            <Typography variant="h5">{analytics.diagnosisMetrics.total}</Typography>
                            <Typography variant="body2" color="success.main">
                                +{analytics.diagnosisMetrics.growth}% this month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Accuracy Rate</Typography>
                            <Typography variant="h5">{analytics.diagnosisMetrics.accuracy}%</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Verified by healthcare providers
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Average Processing Time</Typography>
                            <Typography variant="h5">{analytics.diagnosisMetrics.avgProcessingTime}s</Typography>
                            <Typography variant="body2" color="success.main">
                                {analytics.diagnosisMetrics.processingTrend}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Success Rate</Typography>
                            <Typography variant="h5">{analytics.diagnosisMetrics.successRate}%</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Treatment effectiveness
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Geographical Distribution</Typography>
                            <Box height={300}>
                                <MapChart 
                                    data={analytics.diagnosisMetrics.geoDistribution}
                                    title="Cases by Region"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Severity Distribution</Typography>
                            <Box height={300}>
                                <PieChart 
                                    data={analytics.diagnosisMetrics.severityDistribution}
                                    title="Cases by Severity"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4">System Analytics</Typography>
                <Box display="flex" gap={2}>
                    <FormControl>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            label="Time Range"
                        >
                            <MenuItem value="1month">Last Month</MenuItem>
                            <MenuItem value="3months">Last 3 Months</MenuItem>
                            <MenuItem value="6months">Last 6 Months</MenuItem>
                            <MenuItem value="1year">Last Year</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>View</InputLabel>
                        <Select
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value)}
                            label="View"
                        >
                            <MenuItem value="system">System Metrics</MenuItem>
                            <MenuItem value="users">User Analytics</MenuItem>
                            <MenuItem value="diagnosis">Diagnosis Analytics</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {viewType === 'system' && renderSystemMetrics()}
            {viewType === 'users' && renderUserMetrics()}
            {viewType === 'diagnosis' && renderDiagnosisMetrics()}
        </Box>
    );
};

export default Analytics;

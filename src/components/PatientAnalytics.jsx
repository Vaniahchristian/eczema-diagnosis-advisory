import React, { useState, useEffect } from 'react';
import { getPatientAnalytics } from '../services/analytics';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PatientAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [timeRange, setTimeRange] = useState('1month'); // '1month', '3months', '6months', '1year'

    useEffect(() => {
        const fetchAnalytics = async () => {
            const data = await getPatientAnalytics(timeRange);
            setAnalytics(data);
        };
        fetchAnalytics();
    }, [timeRange]);

    if (!analytics) return <div>Loading analytics...</div>;

    const severityTrendData = {
        labels: analytics.severityTrend.map(point => point.date),
        datasets: [{
            label: 'Severity Score',
            data: analytics.severityTrend.map(point => point.score),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const severityTrendOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Severity Trend Over Time'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                title: {
                    display: true,
                    text: 'Severity Score'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Treatment Progress</h2>
                <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="1month">Last Month</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last Year</option>
                </select>
            </div>
            
            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Current Severity</h3>
                    <p className="text-2xl font-bold">{analytics.currentStatus.severity}/10</p>
                    <span className={analytics.currentStatus.trend === 'improving' ? 'text-green-500' : 'text-red-500'}>
                        {analytics.currentStatus.trend === 'improving' ? '↓ Improving' : '↑ Worsening'}
                    </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Treatment Adherence</h3>
                    <p className="text-2xl font-bold">{analytics.treatmentAdherence}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Symptom-Free Days</h3>
                    <p className="text-2xl font-bold">{analytics.symptomFreeDays}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Next Check-up</h3>
                    <p className="text-2xl font-bold">{analytics.nextCheckup}</p>
                </div>
            </div>

            {/* Severity Trend Chart */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="h-64">
                    <Line data={severityTrendData} options={severityTrendOptions} />
                </div>
            </div>

            {/* Treatment Progress */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Treatment Progress</h3>
                <div className="space-y-4">
                    {analytics.treatments.map((treatment, index) => (
                        <div key={index} className="border-b pb-4">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">{treatment.name}</span>
                                <span className="text-gray-500">{treatment.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${treatment.effectiveness}%` }}
                                    />
                                </div>
                                <span className="text-sm">{treatment.effectiveness}% effective</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trigger Factors Analysis */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Trigger Factors Analysis</h3>
                <div className="space-y-4">
                    {analytics.triggerFactors.map((factor, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">{factor.name}</span>
                                <span className="text-sm text-gray-500">
                                    Last occurred: {factor.lastOccurrence}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-red-500 rounded-full"
                                        style={{ width: `${factor.correlation * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm">{(factor.correlation * 100).toFixed(0)}% correlation</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{factor.recommendation}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientAnalytics;

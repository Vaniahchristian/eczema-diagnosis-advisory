import React, { useState, useEffect } from 'react';
import { getDoctorAnalytics } from '../services/analytics';

const DoctorAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const data = getDoctorAnalytics();
        setAnalytics(data);
    }, []);

    if (!analytics) return <div>Loading analytics...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Total Consultations</h3>
                    <p className="text-2xl font-bold">{analytics.consultationStats.total}</p>
                    <span className="text-green-500">+{analytics.consultationStats.growth}%</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Active Patients</h3>
                    <p className="text-2xl font-bold">{analytics.activePatients}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Avg. Response Time</h3>
                    <p className="text-2xl font-bold">{analytics.responseTime.average}</p>
                    <span className="text-green-500">{analytics.responseTime.improvement}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Patient Satisfaction</h3>
                    <p className="text-2xl font-bold">{analytics.patientSatisfaction}/5</p>
                </div>
            </div>

            {/* Severity Distribution */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Severity Distribution</h3>
                <div className="flex items-center gap-4">
                    {Object.entries(analytics.severityDistribution).map(([key, value]) => (
                        <div key={key} className="flex-1">
                            <div className="text-center">
                                <p className="capitalize">{key}</p>
                                <p className="text-2xl font-bold">{value}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Symptoms */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Most Reported Symptoms</h3>
                <div className="space-y-2">
                    {analytics.topSymptoms.map((symptom, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span>{symptom.name}</span>
                            <span className="font-semibold">{symptom.count} cases</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Patient Age Distribution */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Patient Age Distribution</h3>
                <div className="grid grid-cols-5 gap-4">
                    {Object.entries(analytics.patientAgeGroups).map(([range, percentage]) => (
                        <div key={range} className="text-center">
                            <p className="font-medium">{range}</p>
                            <p className="text-lg">{percentage}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorAnalytics;

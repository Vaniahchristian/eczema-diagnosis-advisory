import React, { useState, useEffect } from 'react';
import { getPatientAnalytics } from '../services/analytics';

const PatientAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const data = getPatientAnalytics();
        setAnalytics(data);
    }, []);

    if (!analytics) return <div>Loading analytics...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Your Progress Dashboard</h2>
            
            {/* Personal Progress */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Current Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-gray-500">Current Severity</p>
                        <p className="text-2xl font-bold">{analytics.personalProgress.severity}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Improvement</p>
                        <p className="text-2xl font-bold text-green-500">
                            {analytics.personalProgress.improvement}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Treatment Adherence</p>
                        <p className="text-2xl font-bold">{analytics.treatmentAdherence}%</p>
                    </div>
                </div>
            </div>

            {/* Trigger Factors */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Your Trigger Factors</h3>
                <div className="space-y-4">
                    {analytics.triggerFactors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{factor.factor}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${(factor.frequency / 10) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-500">{factor.frequency}/10</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500">Next Consultation</p>
                        <p className="text-lg font-medium">{analytics.nextConsultation}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last Update</p>
                        <p className="text-lg font-medium">{analytics.personalProgress.lastUpdate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientAnalytics;

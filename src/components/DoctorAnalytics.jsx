import React, { useState, useEffect } from 'react';
import { getDoctorAnalytics } from '../services/analytics';
import BarChart from './BarChart';
import MapChart from './MapChart';
import PieChart from './PieChart';

const DoctorAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [chartType, setChartType] = useState('age'); // 'age', 'geo', or 'treatment'

    useEffect(() => {
        const fetchAnalytics = async () => {
            const data = await getDoctorAnalytics();
            setAnalytics(data);
        };
        fetchAnalytics();
    }, []);

    if (!analytics) return <div>Loading analytics...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>
            
            {/* Analytics Type Selector */}
            <div className="mb-6">
                <select 
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="age">Age Distribution</option>
                    <option value="geo">Geographical Distribution</option>
                    <option value="treatment">Treatment Recommendations</option>
                </select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Total Patients</h3>
                    <p className="text-2xl font-bold">{analytics.totalPatients}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Active Cases</h3>
                    <p className="text-2xl font-bold">{analytics.activeCases}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Recovery Rate</h3>
                    <p className="text-2xl font-bold">{analytics.recoveryRate}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Avg Treatment Duration</h3>
                    <p className="text-2xl font-bold">{analytics.avgTreatmentDuration} days</p>
                </div>
            </div>

            {/* Main Chart Area */}
            <div className="bg-white p-6 rounded-lg shadow">
                {chartType === 'age' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Age Distribution Analysis</h3>
                        <div className="h-96">
                            <BarChart 
                                data={analytics.ageDistribution}
                                xAxis="ageGroup"
                                yAxis="count"
                                title="Eczema Cases by Age Group"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold">Key Insights:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Most affected age group: {analytics.mostAffectedAgeGroup}</li>
                                    <li>Age-specific trends: {analytics.ageTrends}</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold">Recommendations:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    {analytics.ageBasedRecommendations.map((rec, i) => (
                                        <li key={i}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {chartType === 'geo' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Geographical Distribution</h3>
                        <div className="h-96">
                            <MapChart 
                                data={analytics.geoDistribution}
                                title="Eczema Cases by Region"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold">Regional Insights:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Highest prevalence: {analytics.highestPrevalenceRegion}</li>
                                    <li>Environmental factors: {analytics.environmentalFactors}</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold">Regional Patterns:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    {analytics.regionalPatterns.map((pattern, i) => (
                                        <li key={i}>{pattern}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {chartType === 'treatment' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Treatment Recommendations Analysis</h3>
                        <div className="h-96">
                            <PieChart 
                                data={analytics.treatmentDistribution}
                                title="Most Effective Treatments"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold">Treatment Insights:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Most effective: {analytics.mostEffectiveTreatment}</li>
                                    <li>Success rate: {analytics.treatmentSuccessRate}%</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold">Treatment Patterns:</h4>
                                <ul className="list-disc pl-5 mt-2">
                                    {analytics.treatmentPatterns.map((pattern, i) => (
                                        <li key={i}>{pattern}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAnalytics;

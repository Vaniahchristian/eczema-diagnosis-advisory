// Dummy data generator for analytics
const generateDummyData = () => {
    const today = new Date();
    const last7Days = Array.from({length: 7}, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    }).reverse();

    return {
        consultationStats: {
            total: 150,
            thisWeek: 23,
            lastWeek: 18,
            growth: 27.8
        },
        severityDistribution: {
            mild: 45,
            moderate: 35,
            severe: 20
        },
        weeklyConsultations: {
            labels: last7Days,
            data: [12, 15, 8, 23, 17, 19, 23]
        },
        topSymptoms: [
            { name: 'Itching', count: 89 },
            { name: 'Redness', count: 76 },
            { name: 'Dryness', count: 65 },
            { name: 'Swelling', count: 45 },
            { name: 'Pain', count: 34 }
        ],
        patientAgeGroups: {
            '0-12': 25,
            '13-18': 15,
            '19-30': 30,
            '31-50': 20,
            '50+': 10
        }
    };
};

// Doctor-specific analytics
const getDoctorAnalytics = () => {
    const baseData = generateDummyData();
    return {
        ...baseData,
        responseTime: {
            average: '2.5 hours',
            improvement: '+15%'
        },
        patientSatisfaction: 4.8,
        totalPatients: 178,
        activePatients: 45
    };
};

// Patient-specific analytics
const getPatientAnalytics = () => {
    const baseData = generateDummyData();
    return {
        personalProgress: {
            severity: 'Moderate',
            improvement: '+20%',
            lastUpdate: '2024-02-19'
        },
        treatmentAdherence: 85,
        nextConsultation: '2024-02-25',
        triggerFactors: [
            { factor: 'Stress', frequency: 8 },
            { factor: 'Weather', frequency: 6 },
            { factor: 'Food', frequency: 4 }
        ]
    };
};

export { getDoctorAnalytics, getPatientAnalytics };

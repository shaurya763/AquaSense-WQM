import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 25%, #80deea 50%, #4dd0e1 75%, #26c6da 100%)',
        padding: '40px 20px',
    },

    container: {
        maxWidth: '1400px',
        margin: '0 auto',
    },

    header: {
        textAlign: 'center',
        marginBottom: '48px',
    },

    title: {
        fontSize: '42px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #00acc1, #0097a7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '12px',
        letterSpacing: '-0.5px',
    },

    subtitle: {
        fontSize: '18px',
        color: '#555',
    },

    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '48px',
    },

    statCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '24px',
        borderRadius: '16px',
        border: '2px solid rgba(38, 198, 218, 0.2)',
        boxShadow: '0 8px 24px rgba(38, 198, 218, 0.15)',
        textAlign: 'center',
    },

    statNumber: {
        fontSize: '36px',
        fontWeight: '800',
        color: '#00acc1',
        marginBottom: '8px',
    },

    statLabel: {
        fontSize: '14px',
        color: '#666',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },

    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px',
        marginBottom: '48px',
    },

    chartCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '32px',
        borderRadius: '20px',
        border: '2px solid rgba(38, 198, 218, 0.2)',
        boxShadow: '0 12px 32px rgba(38, 198, 218, 0.15)',
    },

    chartTitle: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#00acc1',
        marginBottom: '24px',
        textAlign: 'center',
    },

    complaintsSection: {
        marginTop: '48px',
    },

    sectionTitle: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#00acc1',
        marginBottom: '24px',
    },

    complaintsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px',
    },

    complaintCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '24px',
        borderRadius: '16px',
        border: '2px solid rgba(38, 198, 218, 0.2)',
        boxShadow: '0 8px 24px rgba(38, 198, 218, 0.15)',
        transition: 'all 0.3s ease',
    },

    complaintHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '2px solid #e0f7fa',
    },

    complaintId: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#00acc1',
        background: '#e0f7fa',
        padding: '4px 12px',
        borderRadius: '12px',
    },

    complaintType: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff',
        background: 'linear-gradient(135deg, #00acc1, #0097a7)',
        padding: '4px 12px',
        borderRadius: '12px',
    },

    complaintDetail: {
        marginBottom: '12px',
    },

    detailLabel: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px',
    },

    detailValue: {
        fontSize: '15px',
        color: '#333',
        fontWeight: '500',
    },

    loading: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#00acc1',
        padding: '60px',
        fontWeight: '600',
    },

    error: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#e53e3e',
        padding: '60px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        border: '2px solid #feb2b2',
    },

    noComplaints: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#666',
        padding: '60px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        border: '2px solid rgba(38, 198, 218, 0.2)',
    },
};

function MyComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8081/api/complaints/getAll');
            setComplaints(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load complaints. Please try again later.');
            console.error('Error fetching complaints:', err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics
    const getComplaintsByType = () => {
        const types = {};
        complaints.forEach(complaint => {
            types[complaint.complaintType] = (types[complaint.complaintType] || 0) + 1;
        });
        return types;
    };

    const getComplaintsByZone = () => {
        const zones = {};
        complaints.forEach(complaint => {
            zones[complaint.zone] = (zones[complaint.zone] || 0) + 1;
        });
        return zones;
    };

    const complaintsByType = getComplaintsByType();
    const complaintsByZone = getComplaintsByZone();

    // Chart data
    const pieChartData = {
        labels: Object.keys(complaintsByType),
        datasets: [
            {
                label: 'Complaints by Type',
                data: Object.values(complaintsByType),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',   // Blue
                    'rgba(139, 92, 246, 0.8)',   // Purple
                    'rgba(20, 184, 166, 0.8)',   // Teal
                    'rgba(249, 115, 22, 0.8)',   // Orange (backup)
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(20, 184, 166, 1)',
                    'rgba(249, 115, 22, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    // Map colors to zones
    const zoneColorMap = {
        'North': { bg: 'rgba(34, 197, 94, 0.8)', border: 'rgba(34, 197, 94, 1)' },    // Green
        'South': { bg: 'rgba(249, 115, 22, 0.8)', border: 'rgba(249, 115, 22, 1)' }, // Orange
        'East': { bg: 'rgba(168, 85, 247, 0.8)', border: 'rgba(168, 85, 247, 1)' },  // Purple
        'West': { bg: 'rgba(236, 72, 153, 0.8)', border: 'rgba(236, 72, 153, 1)' },  // Pink
    };

    const barChartData = {
        labels: Object.keys(complaintsByZone),
        datasets: [
            {
                label: 'Complaints by Zone',
                data: Object.values(complaintsByZone),
                backgroundColor: Object.keys(complaintsByZone).map(zone =>
                    zoneColorMap[zone]?.bg || 'rgba(100, 116, 139, 0.8)'
                ),
                borderColor: Object.keys(complaintsByZone).map(zone =>
                    zoneColorMap[zone]?.border || 'rgba(100, 116, 139, 1)'
                ),
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 12,
                        weight: '600',
                    },
                },
            },
        },
    };

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.loading}>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '12px' }}></i>
                    Loading your complaints...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.error}>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>My Complaints Dashboard</h1>
                    <p style={styles.subtitle}>Track and monitor your water quality complaints</p>
                </div>

                {/* Statistics Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>{complaints.length}</div>
                        <div style={styles.statLabel}>Total Complaints</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>{Object.keys(complaintsByType).length}</div>
                        <div style={styles.statLabel}>Complaint Types</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>{Object.keys(complaintsByZone).length}</div>
                        <div style={styles.statLabel}>Zones Affected</div>
                    </div>
                </div>

                {/* Charts */}
                {complaints.length > 0 && (
                    <div style={styles.chartsGrid}>
                        <div style={styles.chartCard}>
                            <h3 style={styles.chartTitle}>Complaints by Type</h3>
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                        <div style={styles.chartCard}>
                            <h3 style={styles.chartTitle}>Complaints by Zone</h3>
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </div>
                )}

                {/* Complaints List */}
                <div style={styles.complaintsSection}>
                    <h2 style={styles.sectionTitle}>All Complaints</h2>
                    {complaints.length === 0 ? (
                        <div style={styles.noComplaints}>
                            <i className="fas fa-inbox" style={{ fontSize: '48px', marginBottom: '16px', display: 'block', color: '#00acc1' }}></i>
                            No complaints found. Submit your first complaint to get started!
                        </div>
                    ) : (
                        <div style={styles.complaintsGrid}>
                            {complaints.map((complaint) => (
                                <div
                                    key={complaint.id}
                                    style={styles.complaintCard}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 16px 40px rgba(38, 198, 218, 0.25)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(38, 198, 218, 0.15)';
                                    }}
                                >
                                    <div style={styles.complaintHeader}>
                                        <span style={styles.complaintId}>ID: #{complaint.id}</span>
                                        <span style={styles.complaintType}>{complaint.complaintType}</span>
                                    </div>

                                    <div style={styles.complaintDetail}>
                                        <div style={styles.detailLabel}>Name</div>
                                        <div style={styles.detailValue}>{complaint.name}</div>
                                    </div>

                                    <div style={styles.complaintDetail}>
                                        <div style={styles.detailLabel}>Address</div>
                                        <div style={styles.detailValue}>{complaint.address}</div>
                                    </div>

                                    <div style={styles.complaintDetail}>
                                        <div style={styles.detailLabel}>Zone</div>
                                        <div style={styles.detailValue}>{complaint.zone}</div>
                                    </div>

                                    <div style={styles.complaintDetail}>
                                        <div style={styles.detailLabel}>Contact</div>
                                        <div style={styles.detailValue}>
                                            {complaint.phoneNumber}
                                            {complaint.emailAddress && ` • ${complaint.emailAddress}`}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyComplaints;

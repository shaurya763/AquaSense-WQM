import axios from 'axios';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 25%, #80deea 50%, #4dd0e1 75%, #26c6da 100%)',
    padding: '40px 20px',
  },

  container: {
    maxWidth: '1600px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '40px',
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

  topSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '32px',
    marginBottom: '40px',
  },

  filtersCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '32px',
    borderRadius: '20px',
    border: '2px solid rgba(38, 198, 218, 0.2)',
    boxShadow: '0 12px 32px rgba(38, 198, 218, 0.15)',
  },

  filtersTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#00acc1',
    marginBottom: '20px',
  },

  filters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },

  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  filterLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  select: {
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '12px',
    border: '2px solid #b2ebf2',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },

  chartCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '32px',
    borderRadius: '20px',
    border: '2px solid rgba(38, 198, 218, 0.2)',
    boxShadow: '0 12px 32px rgba(38, 198, 218, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  chartTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#00acc1',
    marginBottom: '24px',
    textAlign: 'center',
  },

  complaintsSection: {
    marginTop: '24px',
  },

  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#00acc1',
    marginBottom: '24px',
  },

  complaintsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: '24px',
  },

  complaintCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '28px',
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
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    background: 'linear-gradient(135deg, #00acc1, #0097a7)',
    padding: '6px 16px',
    borderRadius: '12px',
  },

  statusBadge: {
    fontSize: '13px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  statusPending: {
    background: '#fff3cd',
    color: '#856404',
  },

  statusAccepted: {
    background: '#d4edda',
    color: '#155724',
  },

  statusRejected: {
    background: '#f8d7da',
    color: '#721c24',
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

  buttonContainer: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  },

  button: {
    flex: 1,
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: '700',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
  },

  acceptButton: {
    background: 'linear-gradient(135deg, #28a745, #20c997)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
  },

  rejectButton: {
    background: 'linear-gradient(135deg, #dc3545, #e74c3c)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
  },

  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  acknowledgement: {
    marginTop: '12px',
    padding: '12px',
    background: '#e0f7fa',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#00acc1',
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

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [acknowledgements, setAcknowledgements] = useState({});
  const [statusCounts, setStatusCounts] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
  });

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8081/api/complaints/getAll'
        );

        const dataWithStatus = response.data.map((c) => ({
          ...c,
          status: c.status || 'pending',
        }));

        setComplaints(dataWithStatus);
        updateStatusCounts(dataWithStatus);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleAccept = (id) => {
    setAcknowledgements({
      ...acknowledgements,
      [id]: `✓ Complaint #${id} has been accepted successfully`,
    });
    updateComplaintStatus(id, 'accepted');
  };

  const handleReject = (id) => {
    setAcknowledgements({
      ...acknowledgements,
      [id]: `✗ Complaint #${id} has been rejected`,
    });
    updateComplaintStatus(id, 'rejected');
  };

  const updateComplaintStatus = async (id, status) => {
    try {

      const complaintToUpdate = complaints.find((c) => c.id === id);
      if (!complaintToUpdate) return;


      const updatedComplaint = { ...complaintToUpdate, status };


      await axios.put(
        `http://localhost:8081/api/complaints/${id}`,
        updatedComplaint
      );


      const updated = complaints.map((c) =>
        c.id === id ? { ...c, status } : c
      );
      setComplaints(updated);
      updateStatusCounts(updated);
    } catch (error) {
      console.error('Error updating complaint status:', error);
      setAcknowledgements({
        ...acknowledgements,
        [id]: `❌ Error updating status. Please try again.`,
      });
    }
  };

  const updateStatusCounts = (data) => {
    const counts = { accepted: 0, rejected: 0, pending: 0 };
    data.forEach((c) => {
      if (c.status === 'accepted') counts.accepted++;
      else if (c.status === 'rejected') counts.rejected++;
      else counts.pending++;
    });
    setStatusCounts(counts);
  };

  const filteredComplaints = complaints
    .filter((c) =>
      statusFilter === 'ALL' ? true : c.status === statusFilter
    )
    .filter((c) =>
      zoneFilter === 'ALL' ? true : c.zone === zoneFilter
    )
    .filter((c) =>
      typeFilter === 'ALL' ? true : c.complaintType === typeFilter
    );

  const pieData = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [
          statusCounts.accepted,
          statusCounts.rejected,
          statusCounts.pending,
        ],
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'accepted') return { ...styles.statusBadge, ...styles.statusAccepted };
    if (status === 'rejected') return { ...styles.statusBadge, ...styles.statusRejected };
    return { ...styles.statusBadge, ...styles.statusPending };
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage and review water quality complaints</p>
        </div>

        {/* Top Section: Filters and Chart */}
        <div style={styles.topSection}>
          <div style={styles.filtersCard}>
            <h3 style={styles.filtersTitle}>Filter Complaints</h3>
            <div style={styles.filters}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Status</label>
                <select
                  style={styles.select}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#00acc1'}
                  onBlur={(e) => e.target.style.borderColor = '#b2ebf2'}
                >
                  <option value="ALL">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Zone</label>
                <select
                  style={styles.select}
                  value={zoneFilter}
                  onChange={(e) => setZoneFilter(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#00acc1'}
                  onBlur={(e) => e.target.style.borderColor = '#b2ebf2'}
                >
                  <option value="ALL">All Zones</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Type</label>
                <select
                  style={styles.select}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#00acc1'}
                  onBlur={(e) => e.target.style.borderColor = '#b2ebf2'}
                >
                  <option value="ALL">All Types</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Water Contamination">Water Contamination</option>
                  <option value="Low Water Pressure">Low Water Pressure</option>
                </select>
              </div>
            </div>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Status Overview</h3>
            <Pie data={pieData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>

        {/* Complaints List */}
        <div style={styles.complaintsSection}>
          <h2 style={styles.sectionTitle}>
            Complaints ({filteredComplaints.length})
          </h2>
          {filteredComplaints.length === 0 ? (
            <div style={styles.noComplaints}>
              <i className="fas fa-filter" style={{ fontSize: '48px', marginBottom: '16px', display: 'block', color: '#00acc1' }}></i>
              No complaints match the selected filters
            </div>
          ) : (
            <div style={styles.complaintsGrid}>
              {filteredComplaints.map((complaint) => (
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
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={styles.complaintId}>ID: #{complaint.id}</span>
                      <span style={getStatusBadgeStyle(complaint.status)}>
                        {complaint.status}
                      </span>
                    </div>
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

                  <div style={styles.buttonContainer}>
                    <button
                      style={{
                        ...styles.button,
                        ...styles.acceptButton,
                        ...(complaint.status !== 'pending' ? styles.disabledButton : {}),
                      }}
                      disabled={complaint.status !== 'pending'}
                      onClick={() => handleAccept(complaint.id)}
                      onMouseEnter={(e) => {
                        if (complaint.status === 'pending') {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(40, 167, 69, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                      }}
                    >
                      ✓ Accept
                    </button>
                    <button
                      style={{
                        ...styles.button,
                        ...styles.rejectButton,
                        ...(complaint.status !== 'pending' ? styles.disabledButton : {}),
                      }}
                      disabled={complaint.status !== 'pending'}
                      onClick={() => handleReject(complaint.id)}
                      onMouseEnter={(e) => {
                        if (complaint.status === 'pending') {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 53, 69, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
                      }}
                    >
                      ✗ Reject
                    </button>
                  </div>

                  {acknowledgements[complaint.id] && (
                    <div style={styles.acknowledgement}>
                      {acknowledgements[complaint.id]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;

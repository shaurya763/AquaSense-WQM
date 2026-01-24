import axios from 'axios';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const styles = {
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  container: {
    width: '65%',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  chartContainer: {
    width: '30%',
    height: '350px',
    margin: '20px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
  },
  complaintItem: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
  },
  acceptButton: {
    backgroundColor: 'green',
    color: '#fff',
  },
  rejectButton: {
    backgroundColor: 'red',
    color: '#fff',
  },
  acknowledgement: {
    marginTop: '10px',
    textAlign: 'center',
  },
  complaintType: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  filters: {
  display: 'flex',
  gap: '15px',
  marginTop: '10px',
  marginBottom: '20px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
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

  // 🔹 Filters
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
      [id]: `Complaint with ID ${id} accepted`,
    });
    updateComplaintStatus(id, 'accepted');
  };

  const handleReject = (id) => {
    setAcknowledgements({
      ...acknowledgements,
      [id]: `Complaint with ID ${id} rejected`,
    });
    updateComplaintStatus(id, 'rejected');
  };

  const updateComplaintStatus = (id, status) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status } : c
    );
    setComplaints(updated);
    updateStatusCounts(updated);
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

  const data = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [
          statusCounts.accepted,
          statusCounts.rejected,
          statusCounts.pending,
        ],
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
      },
    ],
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <h1
  style={{
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '10px',
  }}
>
  Complaint Dashboard
</h1>


        {/* 🔹 Filters */}
        <div style={styles.filters}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value)}>
            <option value="ALL">All Zones</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="ALL">All Types</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Water Contamination">Water Contamination</option>
            <option value="Low Water Pressure">Low Water Pressure</option>
          </select>
        </div>

        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} style={styles.complaintItem}>
            <p style={styles.complaintType}>{complaint.complaintType}</p>
            <p>Name: {complaint.name}</p>
            <p>Address: {complaint.address}</p>
            <p>Zone: {complaint.zone}</p>
            <p>Phone Number: {complaint.phoneNumber}</p>
            <p>Email Address: {complaint.emailAddress}</p>

            <div style={styles.buttonContainer}>
              <button
                style={{ ...styles.button, ...styles.acceptButton }}
                disabled={complaint.status !== 'pending'}
                onClick={() => handleAccept(complaint.id)}
              >
                Accept
              </button>
              <button
                style={{ ...styles.button, ...styles.rejectButton }}
                disabled={complaint.status !== 'pending'}
                onClick={() => handleReject(complaint.id)}
              >
                Reject
              </button>
            </div>

            {acknowledgements[complaint.id] && (
              <p style={styles.acknowledgement}>
                {acknowledgements[complaint.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={styles.chartContainer}>
        <h3>Complaints Status Overview</h3>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Admin;

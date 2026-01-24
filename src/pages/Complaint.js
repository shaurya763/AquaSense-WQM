import axios from 'axios';
import React, { useState } from 'react';

const styles = {
  page: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    paddingBottom: '40px',
  },

  container: {
    width: '50%',
    maxWidth: '900px',
    padding: '40px',
  },

  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#007bff',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '28px',
  },

  formGroup: {
    marginBottom: '18px',
  },

  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },

  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    borderRadius: '10px',
    border: '1px solid #d0d7de',
    outline: 'none',
  },

  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: 'linear-gradient(135deg, #4ec6eb, #007bff)',
    boxShadow: '0 8px 20px rgba(0,123,255,0.35)',
  },

  error: {
    color: '#d32f2f',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
  },

  success: {
    color: '#2e7d32',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
  },
};

function Complaint() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    zone: '',
    complaintType: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ UPDATED HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number: only digits, max 10
    if (name === 'phoneNumber') {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.name || !formData.address || !formData.zone || !formData.complaintType) {
      setIsSuccess(false);
      setMessage('Please fill out all required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8081/api/complaints/add', formData);

      setFormData({
        name: '',
        address: '',
        zone: '',
        complaintType: '',
        phoneNumber: '',
        emailAddress: '',
      });

      setIsSuccess(true);
      setMessage('Complaint submitted successfully.');
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error submitting complaint. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Raise a Complaint</h1>
        <p style={styles.subtitle}>
          Help us resolve water-related issues quickly and efficiently.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Zone</label>
            <select
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Zone</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Complaint Type</label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Complaint Type</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Water Contamination">Water Contamination</option>
              <option value="Low Water Pressure">Low Water Pressure</option>
            </select>
          </div>

          {/* ✅ UPDATED PHONE INPUT */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your valid phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={styles.input}
              maxLength={10}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              placeholder="Enter your valid email address"
              value={formData.emailAddress}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {message && (
            <p style={isSuccess ? styles.success : styles.error}>
              {message}
            </p>
          )}

          <button type="submit" style={styles.button}>
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaint;

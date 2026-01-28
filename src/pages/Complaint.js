import axios from 'axios';
import React, { useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 25%, #80deea 50%, #4dd0e1 75%, #26c6da 100%)',
    backgroundSize: '400% 400%',
    animation: 'waterFlow 20s ease infinite',
    position: 'relative',
    overflow: 'hidden',
  },

  container: {
    width: '100%',
    maxWidth: '650px',
    padding: '48px',
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '2px solid rgba(38, 198, 218, 0.2)',
    boxShadow: '0 20px 60px rgba(38, 198, 218, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
    animation: 'fadeInUp 0.6s ease-out',
  },

  title: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #00acc1, #0097a7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.5px',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
    marginBottom: '36px',
    lineHeight: '1.6',
  },

  formGroup: {
    marginBottom: '24px',
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    letterSpacing: '0.3px',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    borderRadius: '12px',
    border: '2px solid #b2ebf2',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    fontFamily: 'inherit',
  },

  button: {
    width: '100%',
    padding: '16px',
    fontSize: '17px',
    fontWeight: '700',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: 'linear-gradient(135deg, #00acc1, #0097a7)',
    boxShadow: '0 10px 30px rgba(0, 172, 193, 0.4)',
    transition: 'all 0.3s ease',
    marginTop: '12px',
    letterSpacing: '0.5px',
  },

  error: {
    color: '#e53e3e',
    fontSize: '15px',
    marginBottom: '16px',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#fff5f5',
    borderRadius: '8px',
    border: '1px solid #feb2b2',
    fontWeight: '500',
  },

  success: {
    color: '#38a169',
    fontSize: '15px',
    marginBottom: '16px',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#f0fff4',
    borderRadius: '8px',
    border: '1px solid #9ae6b4',
    fontWeight: '500',
  },

  fieldError: {
    color: '#e53e3e',
    fontSize: '13px',
    marginTop: '6px',
    fontWeight: '500',
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
  const [emailError, setEmailError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === 'phoneNumber') {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }


    if (name === 'emailAddress') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value && !emailRegex.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
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

    // Validate phone number is exactly 10 digits
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      setIsSuccess(false);
      setMessage('Phone number must be exactly 10 digits.');
      return;
    }

    if (formData.emailAddress) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.emailAddress)) {
        setIsSuccess(false);
        setMessage('Please enter a valid email address.');
        setEmailError('Invalid email format');
        return;
      }
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
      setEmailError('');
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error submitting complaint. Please try again.');
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes waterFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
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
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00acc1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#b2ebf2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00acc1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#b2ebf2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00acc1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#b2ebf2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00acc1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#b2ebf2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                required
              >
                <option value="">Select Complaint Type</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Water Contamination">Water Contamination</option>
                <option value="Low Water Pressure">Low Water Pressure</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your valid phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00acc1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#b2ebf2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                style={{
                  ...styles.input,
                  borderColor: emailError ? '#fc8181' : '#b2ebf2',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = emailError ? '#fc8181' : '#00acc1';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = emailError ? '#fc8181' : '#b2ebf2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {emailError && <div style={styles.fieldError}>{emailError}</div>}
            </div>

            {message && (
              <p style={isSuccess ? styles.success : styles.error}>
                {message}
              </p>
            )}

            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(0, 172, 193, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 172, 193, 0.4)';
              }}
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Complaint;

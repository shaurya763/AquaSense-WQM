import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 25%, #80deea 50%, #4dd0e1 75%, #26c6da 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
    },

    container: {
        width: '100%',
        maxWidth: '480px',
        padding: '48px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '2px solid rgba(38, 198, 218, 0.2)',
        boxShadow: '0 20px 60px rgba(38, 198, 218, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
        animation: 'fadeInUp 0.6s ease-out',
    },

    header: {
        textAlign: 'center',
        marginBottom: '36px',
    },

    title: {
        fontSize: '36px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #00acc1, #0097a7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '8px',
        letterSpacing: '-0.5px',
    },

    subtitle: {
        fontSize: '15px',
        color: '#666',
        fontWeight: '500',
    },

    formGroup: {
        marginBottom: '24px',
    },

    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
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
        boxSizing: 'border-box',
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

    errorMessage: {
        marginTop: '16px',
        padding: '12px 16px',
        background: '#fee',
        border: '2px solid #fcc',
        borderRadius: '12px',
        color: '#c33',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
    },

    iconContainer: {
        textAlign: 'center',
        marginBottom: '24px',
    },

    icon: {
        fontSize: '48px',
        color: '#00acc1',
    },
};

// Add keyframes for animation
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

if (styleSheet) {
    try {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
        // Animation already exists
    }
}

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email === 'admin' && formData.password === 'admin123') {
            navigate('/Admin');
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.iconContainer}>
                    <i className="fas fa-user-shield" style={styles.icon}></i>
                </div>

                <div style={styles.header}>
                    <h1 style={styles.title}>Administrator Login</h1>
                    <p style={styles.subtitle}>Access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your username"
                            required
                            onFocus={(e) => {
                                e.target.style.borderColor = '#00acc1';
                                e.target.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#b2ebf2';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                            onFocus={(e) => {
                                e.target.style.borderColor = '#00acc1';
                                e.target.style.boxShadow = '0 0 0 3px rgba(0, 172, 193, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#b2ebf2';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 172, 193, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 172, 193, 0.4)';
                        }}
                    >
                        Sign In
                    </button>

                    {error && <div style={styles.errorMessage}>
                        <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                        {error}
                    </div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
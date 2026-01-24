import React from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f9fc, #e9f2fb)',
  },

  container: {
    maxWidth: '1000px',
    width: '100%',
    padding: '32px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },

  title: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: '800',
    color: '#007bff',
    marginBottom: '24px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },

  card: {
    padding: '20px',
    borderRadius: '12px',
    background: '#f8fbff',
    border: '1px solid #e0e7ef',
  },

  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#007bff',
    marginBottom: '8px',
  },

  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#444',
  },

  footer: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
};

export default function StayAware() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Stay Aware</h1>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Water Quality</div>
            <p style={styles.text}>
              Measures the safety and cleanliness of water for humans, animals, and ecosystems.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Pollutants</div>
            <p style={styles.text}>
              Includes chemicals, sewage, pathogens, and agricultural runoff contaminating water.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Environmental Impact</div>
            <p style={styles.text}>
              Causes ecosystem damage, biodiversity loss, and health risks.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Protection</div>
            <p style={styles.text}>
              Save water, dispose waste responsibly, and reduce pollution.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>SDG 6</div>
            <p style={styles.text}>
              Ensures clean water and sanitation access for everyone.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Take Action</div>
            <p style={styles.text}>
              Awareness and responsible actions build a sustainable future.
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          Small actions today protect water for tomorrow.
        </div>
      </div>
    </div>
  );
}

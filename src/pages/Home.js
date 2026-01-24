import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const styles = {
  pageContent: {
    width: '100vw',
    minHeight: 'calc(100vh - 64px)',

    margin: 0,
    padding: 0,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundImage: `
      linear-gradient(
        rgba(36, 35, 35, 0.45),
        rgba(0,0,0,0.45)
      ),
      url('/images/n.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },

  contentContainer: {
    maxWidth: '640px',
    padding: '48px',
    textAlign: 'center',

    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',

    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.35)',

    transform: 'translateY(30px)',
    opacity: 0,
    transition: 'all 0.6s ease-out',
  },

  visible: {
    transform: 'translateY(0)',
    opacity: 1,
  },

  title: {
    fontSize: '42px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#4ec6eb',
    marginBottom: '16px',
  },

  text: {
    fontSize: '17px',
    lineHeight: '1.7',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '32px',
  },

  button: {
    padding: '14px 36px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '999px',
    border: 'none',

    background: 'linear-gradient(135deg, #4ec6eb, #007bff)',
    color: '#fff',

    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(0,123,255,0.4)',
    transition: 'all 0.3s ease',
  },

  sliderContainer: {
    marginTop: '32px',
  },

  slide: {
    padding: '18px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(6px)',
    fontSize: '16px',
    color: '#fff',
  },
};

function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const tips = [
    "Fix leaking taps and pipes.",
    "Use certified water filters.",
    "Store water in clean containers.",
    "Check local water quality reports.",
    "Boil water to kill pathogens.",
  ];

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section style={styles.pageContent}>
      <div
        style={{
          ...styles.contentContainer,
          ...(show ? styles.visible : {}),
        }}
      >
        <h1 style={styles.title}>Water Quality Monitoring</h1>

        <p style={styles.text}>
          Empowering communities to monitor, protect, and conserve water
          through awareness, reporting, and smart action.
        </p>

        <Link to="/complaint" style={{ textDecoration: 'none' }}>
          <button
            style={styles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow =
                '0 12px 28px rgba(0,123,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 8px 20px rgba(0,123,255,0.4)';
            }}
          >
            Raise a Complaint
          </button>
        </Link>

        <div style={styles.sliderContainer}>
          <Slider {...sliderSettings}>
            {tips.map((tip, index) => (
              <div key={index}>
                <div style={styles.slide}>{tip}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Home;

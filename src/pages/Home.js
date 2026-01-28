import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const styles = {

  heroSection: {
    width: '100%',
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

  heroTitle: {
    fontSize: '42px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#4ec6eb',
    marginBottom: '16px',
  },

  heroText: {
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


  stayAwareSection: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f9fc 0%, #e9f2fb 100%)',
    padding: '80px 20px',
  },

  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  sectionTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: '48px',
    letterSpacing: '-0.5px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  },

  card: {
    padding: '24px',
    borderRadius: '16px',
    background: '#fff',
    border: '2px solid #e0e7ef',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },

  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#007bff',
    marginBottom: '12px',
  },

  cardText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555',
  },

  footer: {
    marginTop: '32px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#007bff',
    fontWeight: '600',
    fontStyle: 'italic',
  },


  aboutSection: {
    minHeight: '100vh',
    background: '#f8fbff',
    padding: '80px 20px',
  },

  aboutText: {
    fontSize: '17px',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '24px',
    textAlign: 'center',
  },

  teamContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    gap: '32px',
    marginTop: '48px',
  },

  teamCard: {
    textAlign: 'center',
    padding: '32px 24px',
    borderRadius: '20px',
    background: '#fff',
    border: '2px solid #e0e7ef',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
    minWidth: '280px',
    maxWidth: '320px',
    flex: '1',
  },

  teamImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
    border: '4px solid #007bff',
    transition: 'transform 0.4s ease',
    objectFit: 'cover',
  },

  teamName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '8px',
    transition: 'color 0.3s ease',
  },

  teamDescription: {
    fontSize: '15px',
    color: '#666',
    marginBottom: '20px',
    transition: 'color 0.3s ease',
  },

  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  },

  socialIcon: {
    fontSize: '28px',
    color: '#007bff',
    transition: 'all 0.3s ease',
  },

  sdgLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease',
  },


  backToTopButton: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #007bff, #4ec6eb)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    boxShadow: '0 8px 24px rgba(0, 123, 255, 0.4)',
    transition: 'all 0.3s ease',
    zIndex: 999,
  },
};

const developers = [
  {
    name: 'Naman Gupta',
    image: 'images/naman.jpg',
    description: 'Student at CDAC NOIDA',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/guptanaman732/',
    },
  },
  {
    name: 'Shaurya Chauhan',
    image: 'images/shaurya.jpg',
    description: 'Student at CDAC NOIDA',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shaurya-chauhan-874016252/',
    },
  },
  {
    name: 'Vishvendra Kumar Singh',
    image: 'images/vicky.jpg',
    description: 'Student at CDAC NOIDA',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/vishvendra-kumar-singh-49b560102/',
    },
  },
];

function Home() {
  const [show, setShow] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setShow(true);


    document.documentElement.style.scrollBehavior = 'smooth';


    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,123,255,0.2)';
      e.currentTarget.style.borderColor = '#007bff';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#e0e7ef';
    }
  };

  const handleTeamCardHover = (e, isHovering) => {
    const img = e.currentTarget.querySelector('img');
    const name = e.currentTarget.querySelector('.team-name');
    const desc = e.currentTarget.querySelector('.team-desc');
    const icons = e.currentTarget.querySelectorAll('i');

    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,123,255,0.25)';
      e.currentTarget.style.borderColor = '#007bff';
      e.currentTarget.style.background = 'linear-gradient(135deg, #007bff, #4ec6eb)';
      if (img) img.style.transform = 'scale(1.1)';
      if (name) name.style.color = '#fff';
      if (desc) desc.style.color = 'rgba(255,255,255,0.9)';
      icons.forEach(icon => icon.style.color = '#fff');
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#e0e7ef';
      e.currentTarget.style.background = '#fff';
      if (img) img.style.transform = 'scale(1)';
      if (name) name.style.color = '#333';
      if (desc) desc.style.color = '#666';
      icons.forEach(icon => icon.style.color = '#007bff');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div
          style={{
            ...styles.contentContainer,
            ...(show ? styles.visible : {}),
          }}
        >
          <h1 style={styles.heroTitle}>Water Quality Monitoring</h1>

          <p style={styles.heroText}>
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

      {/* Stay Aware Section */}
      <section id="stay-aware" style={styles.stayAwareSection}>
        <div style={styles.sectionContainer}>
          <h1 style={styles.sectionTitle}>Stay Aware</h1>

          <div style={styles.grid}>
            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Water Quality</div>
              <p style={styles.cardText}>
                Measures the safety and cleanliness of water for humans, animals, and ecosystems.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Pollutants</div>
              <p style={styles.cardText}>
                Includes chemicals, sewage, pathogens, and agricultural runoff contaminating water.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Environmental Impact</div>
              <p style={styles.cardText}>
                Causes ecosystem damage, biodiversity loss, and health risks.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Protection</div>
              <p style={styles.cardText}>
                Save water, dispose waste responsibly, and reduce pollution.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>SDG 6</div>
              <p style={styles.cardText}>
                Ensures clean water and sanitation access for everyone.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Take Action</div>
              <p style={styles.cardText}>
                Awareness and responsible actions build a sustainable future.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Water Conservation</div>
              <p style={styles.cardText}>
                Promotes efficient water use, rainwater harvesting, and reducing wastage to preserve freshwater resources.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={styles.cardTitle}>Public Health</div>
              <p style={styles.cardText}>
                Clean water prevents waterborne diseases and improves overall community health and well-being.
              </p>
            </div>
          </div>

          <div style={styles.footer}>
            Small actions today protect water for tomorrow.
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.sectionContainer}>
          <h1 style={styles.sectionTitle}>About Us</h1>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={styles.aboutText}>
              Welcome to AquaSense, a water quality monitoring platform! Our mission is to raise awareness about the importance of clean water and promote sustainable practices for managing water resources.
            </p>
            <p style={styles.aboutText}>
              At AquaSense, we believe that access to clean water is a fundamental human right. We work towards ensuring that everyone has access to safe and clean drinking water, as well as proper sanitation facilities.
            </p>
            <p style={styles.aboutText}>
              Our platform provides information about water quality, common water pollutants, and ways to protect water resources. We also support initiatives aligned with{' '}
              <a
                href="https://www.un.org/sustainabledevelopment/water-and-sanitation/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.sdgLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = '#007bff';
                  e.currentTarget.style.color = '#0056b3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                  e.currentTarget.style.color = '#007bff';
                }}
              >
                Sustainable Development Goal 6 (SDG 6)
              </a>
              , which aims to ensure availability and sustainable management of water and sanitation for all.
            </p>
            <p style={styles.aboutText}>
              We are committed to taking complaints and addressing water quality issues promptly. If you have any concerns or complaints about water quality in your area, please reach out to us. Together, we can make a difference.
            </p>
            <p style={styles.aboutText}>
              Thank you for joining us in our mission to promote clean water and sustainable development!
            </p>
          </div>

          <h2 style={{ ...styles.sectionTitle, marginTop: '64px', fontSize: '32px' }}>Our Team</h2>

          <div style={styles.teamContainer}>
            {developers.map((developer, index) => (
              <div
                key={index}
                style={styles.teamCard}
                onMouseEnter={(e) => handleTeamCardHover(e, true)}
                onMouseLeave={(e) => handleTeamCardHover(e, false)}
              >
                <img
                  src={developer.image}
                  alt={developer.name}
                  style={styles.teamImage}
                />
                <div className="team-name" style={styles.teamName}>
                  {developer.name}
                </div>
                <div className="team-desc" style={styles.teamDescription}>
                  {developer.description}
                </div>
                <div style={styles.socialLinks}>
                  <a href={developer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin" style={styles.socialIcon}></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={styles.backToTopButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 123, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 123, 255, 0.4)';
          }}
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}

export default Home;

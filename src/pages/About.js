import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';

const styles = {
page: {
  minHeight: 'calc(100vh - 64px)',  
  background: '#f5f9fc',
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '40px',
},


container: {
  width: '100%',
  maxWidth: '1200px',
  padding: '40px',
},

  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '40px',
  },
  developerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '60px', // Increased margin between About Us and Our Team
  },
  developerCard: {
    textAlign: 'center',
    margin: '20px',
    padding: '20px',
    borderRadius: '10px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  developerCardHover: {
    backgroundColor: '#333',
    color: '#fff',
  },
  developerImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '15px',
    transition: 'transform 0.3s',
  },
  developerImageHover: {
    transform: 'scale(1.1)',
  },
  developerName: {
    fontSize: '21px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  developerDescription: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  socialMediaLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  socialMediaIcon: {
    fontSize: '24px',
    transition: 'color 0.3s',
  },
  socialMediaIconHover: {
    color: '#fff',
  },
};

const developers = [
  {
    name: 'Naman Gupta',
    image: 'images/naman.jpg', // Corrected path to actual image
    description: 'Student at CDAC NOIDA',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/guptanaman732/',
      
    },
  },
  {
    name: 'Shaurya Chauhan',
    image: 'images/shaurya.jpg', // Corrected path to actual image
    description: 'Student at CDAC NOIDA',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shaurya-chauhan-874016252/',
      // github: 'https://github.com/kushalkaparatti',
    },
  },
  {
    name: 'vishvendra kumar singh',
    image: 'images/vicky.jpg', // Corrected path to actual image
    description: 'Student at CDAC  NOIDA',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/vishvendra-kumar-singh-49b560102/',
      // github: '#',
    },
  },
];

function About() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>About Us</h1>
        <div style={styles.content}>
          <p>
            Welcome to the Water Quality Management (WQM) platform! Our mission is to raise awareness about the importance of clean water and promote sustainable practices for managing water resources.
          </p>
          <p>
            At WQM, we believe that access to clean water is a fundamental human right. We work towards ensuring that everyone has access to safe and clean drinking water, as well as proper sanitation facilities.
          </p>
          <p>
            Our platform provides information about water quality, common water pollutants, and ways to protect water resources. We also support initiatives aligned with Sustainable Development Goal 6 (SDG 6), which aims to ensure availability and sustainable management of water and sanitation for all.
          </p>
          <p>
            We are committed to taking complaints and addressing water quality issues promptly. If you have any concerns or complaints about water quality in your area, please reach out to us. Together, we can make a difference.
          </p>
          <p>
            Thank you for joining us in our mission to promote clean water and sustainable development!
          </p>
        </div>
        &nbsp;
        &nbsp;
        <h2 style={styles.title}>Our Team</h2>
        <div style={styles.developerContainer}>
          {developers.map((developer, index) => (
            <div
              key={index}
              style={styles.developerCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.developerCardHover.backgroundColor;
                e.currentTarget.style.color = styles.developerCardHover.color;
                e.currentTarget.querySelector('img').style.transform = styles.developerImageHover.transform;
                const icons = e.currentTarget.querySelectorAll('i');
                icons.forEach(icon => icon.style.color = styles.socialMediaIconHover.color);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
                e.currentTarget.querySelector('img').style.transform = '';
                const icons = e.currentTarget.querySelectorAll('i');
                icons.forEach(icon => icon.style.color = '');
              }}
            >
              <img
                src={developer.image}
                alt={developer.name}
                style={styles.developerImage}
              />
              <div style={styles.developerName}>{developer.name}</div>
              <div style={styles.developerDescription}>{developer.description}</div>
              <div style={styles.socialMediaLinks}>
                <a href={developer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin" style={styles.socialMediaIcon}></i>
                </a>
               {/*
<a href={developer.socialMedia.github} target="_blank" rel="noopener noreferrer">
  <i className="fab fa-github" style={styles.socialMediaIcon}></i>
</a>
*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;

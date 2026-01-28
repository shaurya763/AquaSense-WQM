import { Link, useNavigate, useLocation } from "react-router-dom";

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",

    background: "rgba(37, 194, 214, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#fff",

    boxShadow: "0 4px 12px rgba(0, 172, 193, 0.3)",
  },

  logo: {
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    textDecoration: "none",
    color: "#fff",
  },

  linkList: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  link: {
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "999px",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },

  activeLink: {
    background: "rgba(255,255,255,0.25)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {

    if (location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        AquaSense
      </Link>

      {/* Navigation Links */}
      <ul style={styles.linkList}>
        <li>
          <a
            onClick={() => scrollToSection('stay-aware')}
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <b>Stay Aware</b>
          </a>
        </li>

        <li>
          <a
            onClick={() => scrollToSection('about')}
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <b>About</b>
          </a>
        </li>

        <li>
          <Link
            to="/my-complaints"
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <b>My Complaints</b>
          </Link>
        </li>

        <li>
          <Link
            to="/Login"
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <b>Admin</b>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

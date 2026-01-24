import { Link, NavLink } from "react-router-dom";

const styles = {
  nav: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",

    background: "linear-gradient(135deg, #4ec6eb, #007bff)",
    color: "#fff",

    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
  },

  activeLink: {
    background: "rgba(255,255,255,0.25)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
  },
};

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        AquaSense
      </Link>

      {/* Navigation Links */}
      <ul style={styles.linkList}>
        <li>
          <NavLink
            to="/Complaint"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            <b>Raise Complaint</b>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/StayAware"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            <b>Stay Aware</b>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/About"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            <b>About</b>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Login"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            <b>Admin</b>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/main.css";

export default function Landing() {
  return (
    <>
      <Navbar />

      <div className="landing">
        <div className="overlay">

          <h1>College Help System</h1>
          <p className="subtitle">
            A centralized platform to connect students with skilled helpers
            inside the college premises.
          </p>

          {/* INTRODUCTION */}
          <section className="section">
            <h2>Introduction</h2>
            <p>
              The College Help System is designed to assist students in getting
              academic, technical, and project-related help from experienced
              peers and mentors within the institution. This platform ensures
              fast, transparent, and reliable support.
            </p>
          </section>

          {/* GOALS */}
          <section className="section">
            <h2>Our Goals</h2>
            <ul className="goals">
              <li>✔ Provide quick academic assistance</li>
              <li>✔ Encourage peer-to-peer learning</li>
              <li>✔ Support project development</li>
              <li>✔ Improve collaboration inside the campus</li>
              <li>✔ Maintain transparency in help requests</li>
            </ul>
          </section>

          {/* BUTTONS */}
          <div className="buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <h3>System Administrators</h3>
        <p>Admin Name: College IT Department</p>
        <p>Email: admin@college.edu</p>
        <p>Contact: +91 98765 43210</p>
        <p className="footer-note">
          © 2026 College Help System | All Rights Reserved
        </p>
      </footer>
    </>
  );
}

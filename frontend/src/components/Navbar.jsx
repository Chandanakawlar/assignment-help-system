import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/main.css";
import logo from "../assets/logo.jpeg";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ✅ Always call hooks first
  useEffect(() => {
    if (!token) return; // only fetch notifications if logged in
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        const unread = res.data.filter(n => !n.isRead).length;
        setCount(unread);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, [token]);

  // ✅ Conditional rendering only in JSX
  if (location.pathname === "/login") return null;

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Help System Logo" />
        <span>Help System</span>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>

        {token && role && location.pathname !== "/" && (
          <Link to="/notifications" className="bell">
            <FaBell size={20} />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
        )}
      </div>
    </nav>
  );
}

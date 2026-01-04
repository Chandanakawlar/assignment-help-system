import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/main.css";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <nav className="navbar">
      <h3 className="logo" onClick={() => navigate("/")}>
        Help System
      </h3>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>

        <Link to="/notifications" className="bell">
          <FaBell size={20} />
          {count > 0 && <span className="badge">{count}</span>}
        </Link>
      </div>
    </nav>
  );
}

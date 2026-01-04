import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Notifications</h2>

        {notifications.length === 0 && <p>No notifications</p>}

        {notifications.map(n => (
          <div key={n._id} className={`card ${n.isRead ? "read" : ""}`}>
            <p>{n.message}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

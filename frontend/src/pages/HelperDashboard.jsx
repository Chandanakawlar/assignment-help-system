import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function HelperDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/requests/open");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.msg || "Error fetching requests");
      }
    };
    fetchRequests();
  }, []);

  const accept = async (id) => {
    try {
      await API.put(`/requests/accept/${id}`);
      setRequests(requests.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error accepting request");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Helper Dashboard</h2>
        {requests.length === 0 && <p>No open requests</p>}
        {requests.map(r => (
          <div key={r._id} className="card">
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <p>Cost: ₹{r.cost}</p>
            <p>Last Date: {r.lastDate ? new Date(r.lastDate).toLocaleDateString() : "N/A"}</p>
            <p><b>Student:</b> {r.student.name} ({r.student.email})</p>
            <button onClick={() => accept(r._id)}>Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
}

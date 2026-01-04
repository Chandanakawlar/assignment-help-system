import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Student Dashboard</h2>
        <Link to="/post-request" className="btn">Post Help Request</Link>
      </div>
    </div>
  );
}

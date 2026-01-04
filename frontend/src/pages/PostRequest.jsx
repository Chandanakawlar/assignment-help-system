import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PostRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [lastDate, setLastDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !cost || !lastDate) {
      return alert("All fields are required");
    }

    try {
      await API.post("/requests", { title, description, cost, lastDate });
      alert("Request posted successfully");
      navigate("/student");
    } catch (err) {
      console.error("PostRequest Error:", err);
      alert(err.response?.data?.msg || "Server Error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth">
        <h2>Post Help Request</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cost (₹)"
            value={cost}
            onChange={e => setCost(e.target.value)}
          />
          <input
            type="date"
            placeholder="Last Date"
            value={lastDate}
            onChange={e => setLastDate(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/main.css";

export default function PostRequest() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    cost: "",
    lastDate: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/requests", form);
      alert("Help request posted successfully");
      setForm({ title: "", description: "", cost: "", lastDate: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Error posting request");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-bg">
        <div className="form-card">
          <h2>Post Help Request</h2>
          <p>Describe your project and set requirements</p>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="cost"
              placeholder="Cost (₹)"
              value={form.cost}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="lastDate"
              value={form.lastDate}
              onChange={handleChange}
              required
            />

            <button type="submit">Post Request</button>
          </form>
        </div>
      </div>
    </>
  );
}

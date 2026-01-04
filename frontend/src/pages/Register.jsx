import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="auth">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
        <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
        
        <select onChange={e => setForm({...form, role:e.target.value})}>
          <option value="student">Student</option>
          <option value="helper">Help Assistant</option>
        </select>

        <button>Register</button>
      </form>
    </div>
  );
}

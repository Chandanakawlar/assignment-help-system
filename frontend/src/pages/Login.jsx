import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email & Password required");

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "student") navigate("/student");
      else navigate("/helper");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue using the Help System</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

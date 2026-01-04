import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

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

      if (res.data.role === "student") navigate("/student");
      else navigate("/helper");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Network Error");
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="auth">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

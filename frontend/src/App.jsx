import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import HelperDashboard from "./pages/HelperDashboard";
import PostRequest from "./pages/PostRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/helper" element={<HelperDashboard />} />
        <Route path="/post-request" element={<PostRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

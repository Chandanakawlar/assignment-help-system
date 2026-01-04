import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="btn btn-outline">Home</Link>
    </nav>
  );
}

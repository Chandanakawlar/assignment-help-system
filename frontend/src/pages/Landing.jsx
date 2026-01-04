import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <h1>Student Help Assignment System</h1>
        <p>
          A platform where students can post assignment help requests and
          helpers can assist and upload completed work.
        </p>

        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn btn-outline">Register</Link>
        </div>
      </div>
    </div>
  );
}

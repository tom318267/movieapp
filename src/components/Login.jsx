import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State to track success
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true); // Set success to true
      setTimeout(() => navigate("/"), 3000); // Redirect to the home page after 3 seconds
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login Error:", err);
    }
    setLoading(false); // Stop loading
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {success ? (
        <p style={{ color: "green" }}>Login successful! Redirecting...</p>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

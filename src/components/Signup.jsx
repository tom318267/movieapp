import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to the home page after successful signup
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please try another one.");
      } else {
        setError(err.message);
      }
      console.error("Signup Error:", err);
    }
    setLoading(false);
  };

  return (
    <div class="signup-form">
      <h2>SIGN UP</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

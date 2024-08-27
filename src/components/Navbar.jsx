import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav>
      <img className="logo" src="/flickfinder 1.png" alt="" />
      <div>
        <Link to="/">Home</Link>
        {!user ? (
          <>
            <Link to="/signup" style={{ marginLeft: "1.2rem" }}>
              Sign Up
            </Link>
            <Link to="/login" style={{ marginLeft: "1.2rem" }}>
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleSignOut} style={{ marginLeft: "1rem" }}>
            Sign Out
          </button>
        )}
      </div>
      <button onClick={toggleDarkMode} style={{ marginLeft: "1rem" }}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;

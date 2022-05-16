import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    console.log("You are logged out");
    navigate("/");
  };

  if (localStorage.getItem("authToken")) {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all-companies">Find Business</Link>
        <Link to="/create">Create Business</Link>
        <Link to="/" onClick={logout}>Logout</Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
    );
  }
}

export default NavBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    //console.log("You are logged out");
    navigate("/");
  };

  if (localStorage.getItem("authToken")) {
    return (
      <nav>
        <div>ABILITY</div>
        <ul>
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/all-companies">Find Business</Link>
          <Link className="links" to="/create">Create Business</Link>
          <Link className="links" to="/update">Update Profile</Link>
          <Link className="links" to="/" onClick={logout}>Logout</Link>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
       <div>ABILITY</div>
        <ul>
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/signup">Signup</Link>
          <Link className="links" to="/login">Login</Link>
          </ul>
      </nav>
    );
  }
}

export default NavBar;

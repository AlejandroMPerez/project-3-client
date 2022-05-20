import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

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

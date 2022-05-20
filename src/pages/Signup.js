import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";
import "./Singup.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  function checkFields(e) {
    e.preventDefault();
    //console.log("Signup", username, password);

    if (!username || !password || !email || !firstName || !lastName) {
      setErrorMessage("Please fill out Username, Password, Email, First Name, and Last Name fields.")
    } else if (username.length < 5) {
      setErrorMessage("Username must have atleast 5 characters.");
    } else if (password.length < 6) {
      setErrorMessage("Password must be atleast 6 characters.");
    } else if (password.includes("password")) {
      setErrorMessage("Your password can't include the word password.");
    } else if (!email.includes("@")) {
      setErrorMessage("Entered email is not valid.");
    } else {

    post("/users/signup", {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      city: city,
      state: state,
    })
      .then((results) => {
        //console.log("Results", results.data.token);
        localStorage.setItem("authToken", results.data.token);
        localStorage.setItem("id", results.data.id);
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
    }
  }

  return (
    <section className="section">
      <h1>Signup</h1>
      <form className="form" onSubmit={checkFields}>

        <TextField id="standard-basic" label="Username" variant="standard"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          value={username}
        />
        {/* <label>Username</label> */}
        {/* <input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          value={username}
        /> */}

        <TextField id="standard-basic" label="Password" variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          value={password}
        />
        {/* <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          value={password}
        /> */}

        <TextField id="standard-basic" label="Email" variant="standard" 
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />
        {/* <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        /> */}

        <TextField id="standard-basic" label="First Name" variant="standard" 
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          value={firstName}
        />
        {/* <label>First Name</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          value={firstName}
        /> */}

        <TextField id="standard-basic" label="Last Name" variant="standard"
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          value={lastName}
        />
        {/* <label>Last Name</label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          value={lastName}
        /> */}

        <TextField id="standard-basic" label="Date Of Birth" variant="standard"
          onChange={(e) => setDateOfBirth(e.target.value)}
          name="dateOfBirth"
          value={dateOfBirth}
        />
        {/* <label>Date of Birth</label>
        <input
          onChange={(e) => setDateOfBirth(e.target.value)}
          name="dateOfBirth"
          value={dateOfBirth}
        /> */}

        <TextField id="standard-basic" label="City" variant="standard"
          onChange={(e) => setCity(e.target.value)}
          name="city"
          value={city}
        />
        {/* <label>City</label>
        <input
          onChange={(e) => setCity(e.target.value)}
          name="city"
          value={city}
        /> */}

        <TextField id="standard-basic" label="State" variant="standard"
          onChange={(e) => setState(e.target.value)}
          name="state"
          value={state}
        />
        {/* <label>State</label>
        <input
          onChange={(e) => setState(e.target.value)}
          name="state"
          value={state}
        /> */}

        <br/>
        <Button variant="contained" type="submit">Create Profile!</Button>
        {/* <button type="submit">Create Profile!</button> */}
        <p>{errorMessage}</p>
      </form>
    </section>
  );
}

export default Signup;

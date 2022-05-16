import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

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

    if (username.length < 5) {
      setErrorMessage("Username must have atleast 5 characters.");
    } else if (password.length < 6) {
      setErrorMessage("Password must be atleast 6 characters.");
    } else if (password.includes("password")) {
      setErrorMessage("Password can't include password.");
    } else if (!email.includes("@")) {
      setErrorMessage("Email must include an @ symbol.");
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
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={checkFields}>
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          value={username}
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          value={password}
        />
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />
        <label>First Name</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          value={firstName}
        />
        <label>Last Name</label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          value={lastName}
        />
        <label>Date of Birth</label>
        <input
          onChange={(e) => setDateOfBirth(e.target.value)}
          name="dateOfBirth"
          value={dateOfBirth}
        />
        <label>City</label>
        <input
          onChange={(e) => setCity(e.target.value)}
          name="city"
          value={city}
        />
        <label>State</label>
        <input
          onChange={(e) => setState(e.target.value)}
          name="state"
          value={state}
        />

        <button type="submit">Create Profile!</button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
}

export default Signup;

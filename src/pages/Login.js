import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const [loginUsername, setLoginUsername] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const navigate = useNavigate();

  function checkLoginFields(e) {
    e.preventDefault();

    post("/users/login", {
      username: loginUsername,
      password: loginPassword,
    })
      .then((results) => {
        localStorage.setItem("authToken", results.data.token);
        localStorage.setItem("id", results.data.id);
        navigate("/");
      })
      .catch((err) => {
        //NOTE: maybe call something similar to setErrorMessage here, so it is more descriptive to the user
        console.log("Something went wrong", err.message);
      });
  }
  return (
    <section className="loginSection">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={checkLoginFields}>
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          onChange={(e) => setLoginUsername(e.target.value)}
          name="username"
          value={loginUsername}
        />

        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          onChange={(e) => setLoginPassword(e.target.value)}
          name="password"
          type="password"
          value={loginPassword}
        />

        <br />
        <Button variant="contained" type="submit">
          Welcome!
        </Button>
      </form>
    </section>
  );
}

export default Login;

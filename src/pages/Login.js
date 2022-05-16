import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

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
        //console.log("Results", results.data.token);
        localStorage.setItem("authToken", results.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });

  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={checkLoginFields}>

        <label>Username</label>
        <input 
          onChange={(e) => setLoginUsername(e.target.value)}
          name="username"
          value={loginUsername}
        />

        <label>Password</label>
        <input 
          onChange={(e) => setLoginPassword(e.target.value)}
          name="password"
          type="password"
          value={loginPassword}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

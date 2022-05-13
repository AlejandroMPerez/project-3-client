import React from "react";
import { post } from "../authService/authService"
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  function checkFields(e) {
    e.preventDefault();
    console.log("Signup", username, password);
    post("/users/signup", {
        username: username,
        password: password
    })
    .then((results) => {
        console.log("Results", results.data.token);
        localStorage.setItem("authToken", results.data.token)
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  };

//     if (username.length > 5) {
//         setErrorMessage("Username is not long enough")
//     } else if (password.length > 6) {
//         setErrorMessage("Password is not long enough")
//     } else if (password.includes("password")) {
//         setErrorMessage("Password is not long enough")
//     }
//   }

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
          value={password}
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default Signup;

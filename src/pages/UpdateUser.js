import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const [updateUsername, setUpdateUsername] = React.useState("");
  const [updateEmail, setUpdateEmail] = React.useState("");
  const [updateFirstName, setUpdateFirstName] = React.useState("");
  const [updateLastName, setUpdateLastName] = React.useState("");
  const [updateDateOfBirth, setUpdateDateOfBirth] = React.useState("");
  const [updateCity, setUpdateCity] = React.useState("");
  const [updateState, setUpdateState] = React.useState("");
  const [updateErrorMessage, setUpdateErrorMessage] = React.useState("");


  //PREPOPULATE FIELDS WITH CURRENT ACCOUNT INFO
//   get("/users/update", {
//     username: currentUser.username,
//     email: currentUser.email,
//     firstName: currentUser.firstName,
//     lastName: currentUser.lastName,
//     dateOfBirth: currentUser.dateOfBirth,
//     city: currentUser.city,
//     state: currentUser.state,
//   })
//     .then((results) => {
//       //console.log("Results", results.data.token);
//       localStorage.setItem("authToken", results.data.token);
//       navigate("/");
//     })
//     .catch((err) => {
//       console.log("Something went wrong", err.message);
//     });

const navigate = useNavigate();

  function checkUpdateFields(e) {
    e.preventDefault();
    //console.log("Signup", username, password);

    if (updateUsername.length < 5) {
        setUpdateErrorMessage("Username must have atleast 5 characters.");
    } else if (!updateEmail.includes("@")) {
        setUpdateErrorMessage("Email must include an @ symbol.");
    } else {
      post("/users/update", {
        username: updateUsername,
        email: updateEmail,
        firstName: updateFirstName,
        lastName: updateLastName,
        dateOfBirth: updateDateOfBirth,
        city: updateCity,
        state: updateState,
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
      <h1>Update Your Profile</h1>
      <form onSubmit={checkUpdateFields}>
        <label>Username</label>
        <input
          onChange={(e) => setUpdateUsername(e.target.value)}
          name="username"
          value={updateUsername}
        />
        <label>Email</label>
        <input
          onChange={(e) => setUpdateEmail(e.target.value)}
          name="email"
          value={updateEmail}
        />
        <label>First Name</label>
        <input
          onChange={(e) => setUpdateFirstName(e.target.value)}
          name="firstName"
          value={updateFirstName}
        />
        <label>Last Name</label>
        <input
          onChange={(e) => setUpdateLastName(e.target.value)}
          name="lastName"
          value={updateLastName}
        />
        <label>Date of Birth</label>
        <input
          onChange={(e) => setUpdateDateOfBirth(e.target.value)}
          name="dateOfBirth"
          value={updateDateOfBirth}
        />
        <label>City</label>
        <input
          onChange={(e) => setUpdateCity(e.target.value)}
          name="city"
          value={updateCity}
        />
        <label>State</label>
        <input
          onChange={(e) => setUpdateState(e.target.value)}
          name="state"
          value={updateState}
        />

        <button type="submit">Update Profile!</button>
        <p>{updateErrorMessage}</p>
      </form>
      <button>Delete Profile</button>
    </div>
  );
}

export default UpdateUser;

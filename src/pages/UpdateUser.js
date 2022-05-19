import React from "react";
import { post, get } from "../authService/authService";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const [user, setUser] = React.useState({});
  // const [updateUsername, setUpdateUsername] = React.useState("");
  // const [updateEmail, setUpdateEmail] = React.useState("");
  // const [updateFirstName, setUpdateFirstName] = React.useState("");
  // const [updateLastName, setUpdateLastName] = React.useState("");
  // const [updateDateOfBirth, setUpdateDateOfBirth] = React.useState("");
  // const [updateCity, setUpdateCity] = React.useState("");
  // const [updateState, setUpdateState] = React.useState("");
  const [updateErrorMessage, setUpdateErrorMessage] = React.useState("");

  const navigate = useNavigate();

  //PREPOPULATE FIELDS WITH CURRENT ACCOUNT INFO
  React.useEffect(() => {
    get("/users/update")
    .then((results) => {
      setUser(results.data)
    })
    .catch((err) => {
      console.log("Something went wrong", err.message);
    }); 
  }, [])
  
  //console.log("USER", user)


  function create(e) {
    e.preventDefault();

    post("/users/update", user)
      .then((results) => {
        console.log("Results", results.data);
        navigate("/")
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }
  // function checkUpdateFields(e) {
  //   e.preventDefault();
  //   //console.log("Signup", username, password);

  //   if (updateUsername.length < 5) {
  //       setUpdateErrorMessage("Username must have atleast 5 characters.");
  //   } else if (!updateEmail.includes("@")) {
  //       setUpdateErrorMessage("Entered email is not valid.");
  //   } else {
  //     post("/users/update", {
  //       username: updateUsername,
  //       email: updateEmail,
  //       firstName: updateFirstName,
  //       lastName: updateLastName,
  //       dateOfBirth: updateDateOfBirth,
  //       city: updateCity,
  //       state: updateState,
  //     })
  //       .then((results) => {
  //         //console.log("Results", results.data.token);
  //         localStorage.setItem("authToken", results.data.token);
  //       })
  //       .catch((err) => {
  //         console.log("Something went wrong", err.message);
  //       });
  //   }
  // }

  function deleteUser() {
    post("/users/delete")
    .then(() => {
      localStorage.clear();
      navigate("/")
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  console.log("USER VARIABLE", user)

  return (
    <div>
      <h1>Update Your Profile</h1>
      <form onSubmit={create}>
        <label>Username</label>
        <input
          name="username"
          value= {user && user.username}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label>Email</label>
        <input
          name="email"
          value={user && user.email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label>First Name</label>
        <input
          name="firstName"
          value={user && user.firstName}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label>Last Name</label>
        <input
          name="lastName"
          value={user && user.lastName}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label>Date of Birth</label>
        <input
          name="dateOfBirth"
          value={user && user.dateOfBirth}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label>City</label>
        <input
          name="city"
          value={user && user.city}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label>State</label>
        <input
          name="state"
          value={user && user.state}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <button type="submit">Update Profile!</button>
        <p>{updateErrorMessage}</p>
      </form>
      <button onClick={deleteUser}>Delete Profile</button>
    </div>
  );
}
//   return (
//     <div>
//       <h1>Update Your Profile</h1>
//       <form onSubmit={checkUpdateFields}>
//         <label>Username</label>
//         <input
//           onChange={(e) => setUpdateUsername(e.target.value)}
//           name="username"
//           value={updateUsername}
//         />
//         <label>Email</label>
//         <input
//           onChange={(e) => setUpdateEmail(e.target.value)}
//           name="email"
//           value={updateEmail}
//         />
//         <label>First Name</label>
//         <input
//           onChange={(e) => setUpdateFirstName(e.target.value)}
//           name="firstName"
//           value={updateFirstName}
//         />
//         <label>Last Name</label>
//         <input
//           onChange={(e) => setUpdateLastName(e.target.value)}
//           name="lastName"
//           value={updateLastName}
//         />
//         <label>Date of Birth</label>
//         <input
//           onChange={(e) => setUpdateDateOfBirth(e.target.value)}
//           name="dateOfBirth"
//           value={updateDateOfBirth}
//         />
//         <label>City</label>
//         <input
//           onChange={(e) => setUpdateCity(e.target.value)}
//           name="city"
//           value={updateCity}
//         />
//         <label>State</label>
//         <input
//           onChange={(e) => setUpdateState(e.target.value)}
//           name="state"
//           value={updateState}
//         />

//         <button type="submit">Update Profile!</button>
//         <p>{updateErrorMessage}</p>
//       </form>
//       <button onClick={deleteUser}>Delete Profile</button>
//     </div>
//   );
// }

export default UpdateUser;

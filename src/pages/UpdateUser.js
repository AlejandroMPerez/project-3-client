import React from "react";
import { post, get } from "../authService/authService";
import { useNavigate } from "react-router-dom";
import "./UpdateUser.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function UpdateUser() {
  const [user, setUser] = React.useState({});
  const [updateErrorMessage, setUpdateErrorMessage] = React.useState("");

  const navigate = useNavigate();

  //PREPOPULATE FIELDS WITH CURRENT ACCOUNT INFO
  React.useEffect(() => {
    get("/users/update")
      .then((results) => {
        setUser(results.data);
      })
      .catch(() => {
        setUpdateErrorMessage("Something went wrong showing your account information.")
      });
  }, []);

  function create(e) {
    e.preventDefault();

    post("/users/update", user)
      .then((results) => {
        console.log("Results", results.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  function deleteUser() {
    post("/users/delete")
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <section className="updateUserSection">
      <h1>Update Your Profile</h1>
      <form className="updateUserForm" onSubmit={create}>
        <TextField
          id="standard-basic"
          variant="standard"
          name="username"
          value={user && user.username}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <TextField
          id="standard-basic"
          variant="standard"
          name="email"
          value={user && user.email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <TextField
          id="standard-basic"
          variant="standard"
          name="firstName"
          value={user && user.firstName}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <TextField
          id="standard-basic"
          variant="standard"
          name="lastName"
          value={user && user.lastName}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <TextField
          id="standard-basic"
          variant="standard"
          name="dateOfBirth"
          value={user && user.dateOfBirth}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <TextField
          id="standard-basic"
          variant="standard"
          name="city"
          value={user && user.city}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <TextField
          id="standard-basic"
          variant="standard"
          name="state"
          value={user && user.state}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <br />
        <Button variant="contained" type="submit">
          Update Profile!
        </Button>
        <p>{updateErrorMessage}</p>
      </form>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={deleteUser}
      >
        Delete Profile
      </Button>
    </section>
  );
}

export default UpdateUser;

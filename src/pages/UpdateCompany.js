import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../authService/authService";
import "./updateCompany.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function UpdateCompany() {
  const [updateName, setUpdateName] = React.useState("");
  const [updateAbout, setUpdateAbout] = React.useState("");
  const [updateAddress, setUpdateAddress] = React.useState("");
  const [updateCity, setUpdateCity] = React.useState("");
  const [updateState, setUpdateState] = React.useState("");
  const [updateZip, setUpdateZip] = React.useState("");
  const [updatePhone, setUpdatePhone] = React.useState("");
  const [updateEmail, setUpdateEmail] = React.useState("");
  const [updateUrl, setUpdateUrl] = React.useState("");
  const [updateErrorMessage, setUpdateErrorMessage] = React.useState("");

  const navigate = useNavigate();
  const params = useParams();

  function checkUpdateFields(e) {
    e.preventDefault();
    //NOTE: if you're trying to detect for emails, look into the full Regex for email
    if (!updateEmail.includes("@")) {
      setUpdateErrorMessage("Entered email is not valid.");
    } else {
      post(`/companies/all-companies/${params.id}/edit`, {
        name: updateName,
        about: updateAbout,
        address: updateAddress,
        city: updateCity,
        state: updateState,
        zip: updateZip,
        phone: updatePhone,
        email: updateEmail,
        url: updateUrl,
      })
        .then(() => {
          navigate("/all-companies");
        })
        .catch((err) => {
          //NOTE: maybe call setUpdateErrorMessage here, so it is more descriptive to the user
          console.log("Something went wrong", err.message);
        });
    }
  }

  return (
    <section className="updateCompanySection">
      <h1>Update Business</h1>
      <form className="updateCompanyForm" onSubmit={checkUpdateFields}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          onChange={(e) => setUpdateName(e.target.value)}
          name="name"
          value={updateName}
        />

        <TextField
          onChange={(e) => setUpdateAbout(e.target.value)}
          name="about"
          value={updateAbout}
          id="standard-multiline-static"
          // MUI below this line
          label="About Us"
          multiline
          rows={5}
          variant="standard"
        />

        <TextField
          id="standard-basic"
          label="Address"
          variant="standard"
          onChange={(e) => setUpdateAddress(e.target.value)}
          name="address"
          value={updateAddress}
        />

        <TextField
          id="standard-basic"
          label="City"
          variant="standard"
          onChange={(e) => setUpdateCity(e.target.value)}
          name="city"
          value={updateCity}
        />

        <TextField
          id="standard-basic"
          label="State"
          variant="standard"
          onChange={(e) => setUpdateState(e.target.value)}
          name="state"
          value={updateState}
        />

        <TextField
          id="standard-basic"
          label="Zip Code"
          variant="standard"
          onChange={(e) => setUpdateZip(e.target.value)}
          name="zip"
          value={updateZip}
        />

        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          onChange={(e) => setUpdatePhone(e.target.value)}
          name="phone"
          value={updatePhone}
        />

        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(e) => setUpdateEmail(e.target.value)}
          name="email"
          value={updateEmail}
        />

        <TextField
          id="standard-basic"
          label="Website URL"
          variant="standard"
          onChange={(e) => setUpdateUrl(e.target.value)}
          name="url"
          value={updateUrl}
        />

        <br />
        <Button variant="contained" type="submit">
          Submit Changes!
        </Button>
        <p>{updateErrorMessage}</p>
      </form>
    </section>
  );
}

export default UpdateCompany;

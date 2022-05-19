import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../authService/authService";

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
              navigate("/all-companies")
            })
            .catch((err) => {
              console.log("Something went wrong", err.message);
            });
        }
      }

    return (
        <section>
          <h1>Update Business</h1>
          <form onSubmit={checkUpdateFields}>
            <label>Name</label>
            <input
              onChange={(e) => setUpdateName(e.target.value)}
              name="name"
              value={updateName}
            />
            <label>About</label>
            <textarea
              onChange={(e) => setUpdateAbout(e.target.value)}
              name="about"
              cols="10"
              rows="5"
              value={updateAbout}
            />
            <label>Address</label>
            <input
              onChange={(e) => setUpdateAddress(e.target.value)}
              name="address"
              value={updateAddress}
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
            <label>Zip Code</label>
            <input
              onChange={(e) => setUpdateZip(e.target.value)}
              name="zip"
              value={updateZip}
            />
            <label>Phone</label>
            <input
              onChange={(e) => setUpdatePhone(e.target.value)}
              name="phone"
              value={updatePhone}
            />
            <label>Email</label>
            <input
              onChange={(e) => setUpdateEmail(e.target.value)}
              name="email"
              value={updateEmail}
            />
            <label>Website</label>
            <input
              onChange={(e) => setUpdateUrl(e.target.value)}
              name="url"
              value={updateUrl}
            />
    
            <button type="submit">Submit Changes!</button>
            <p>{updateErrorMessage}</p>
          </form>
        </section>
      );
}

export default UpdateCompany;
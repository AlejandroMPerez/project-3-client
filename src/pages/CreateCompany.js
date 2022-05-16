import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom"

function CreateCompany() {
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  function checkCreateCompanyFields(e) {
    e.preventDefault();

    if (!name || !address || !city || !state || !zip) {
        setErrorMessage("Please fill out Name, Address, City, State, and Zip Code fields.");
      } else if (!email.includes("@")) {
        setErrorMessage("Email must include an @ symbol.");
      } else {

    post("/companies/create", {
      image: image,
      name: name,
      about: about,
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
      url: url,
    })
    .then(() => {
        navigate("/all-companies");
    })
    .catch((err) => {
        console.log("Something went wrong", err.message);
    });
    }
  }

  return (
    <section>
      <h1>Create Business</h1>
      <form onSubmit={checkCreateCompanyFields}>
        <input
          onChange={(e) => setImage(e.target.value)}
          name="image"
          value={image}
        />
        <label>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={name}
        />
        <label>About</label>
        <input
          onChange={(e) => setAbout(e.target.value)}
          name="about"
          value={about}
        />
        <label>Address</label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          value={address}
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
        <label>Zip Code</label>
        <input
          onChange={(e) => setZip(e.target.value)}
          name="zip"
          value={zip}
        />
        <label>Phone</label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          value={phone}
        />
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />
        <label>Website</label>
        <input
          onChange={(e) => setUrl(e.target.value)}
          name="url"
          value={url}
        />

        <button type="submit">Create Business!</button>
        <p>{errorMessage}</p>
      </form>
    </section>
  );
}

export default CreateCompany;

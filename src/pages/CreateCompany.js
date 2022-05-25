import React from "react";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom"
import "./CreateCompany.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        setErrorMessage("Entered email is not valid.");
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
    .then((results) => {
        console.log("New Company", results.data)
        navigate("/all-companies");
    })
    .catch((err) => {
        console.log("Something went wrong", err.message);
    });
    }
  }

  //Cloudinary
  function handleFileUpload(e) {
    //create FormData (object)
    const uploadData = new FormData()

    uploadData.append("imageUrl", e.target.files[0])

    post("/companies/image-upload", uploadData)
        .then((results) => {
            console.log("This is the image path", results.data);
            setImage(results.data)
        })
        .catch((err) => {
            console.log("Error", err.message);
        })
  }

  return (
    <section className="CreateCompanySection">
      <h1>Create Business</h1>

      <form className="CreateCompanyForm" onSubmit={checkCreateCompanyFields}>

        <input
          onChange={(e) => handleFileUpload(e)}
          type="file"
        />

        <TextField id="standard-basic" label="Name" variant="standard"
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={name}
        />

        <TextField
          onChange={(e) => setAbout(e.target.value)}
          name="about"
          value={about}
          // MUI below this line
          id="standard-multiline-static"
          label="About Us"
          multiline
          rows={5}
          variant="standard"
        />

        <TextField id="standard-basic" label="Address" variant="standard"
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          placeholder="ex: 1234 SW 1 Ave"
          value={address}
        />

        <TextField id="standard-basic" label="City" variant="standard"
          onChange={(e) => setCity(e.target.value)}
          name="city"
          placeholder="ex: Miami"
          value={city}
        />

        <TextField id="standard-basic" label="State" variant="standard"
          onChange={(e) => setState(e.target.value)}
          name="state"
          placeholder="ex: FL"
          value={state}
        />

        <TextField id="standard-basic" label="Zip Code" variant="standard"
          onChange={(e) => setZip(e.target.value)}
          name="zip"
          value={zip}
        />

        <TextField id="standard-basic" label="Phone" variant="standard"
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          value={phone}
        />

        <TextField id="standard-basic" label="Email" variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />

        <TextField id="standard-basic" label="Website URL" variant="standard"
          onChange={(e) => setUrl(e.target.value)}
          name="url"
          value={url}
        />

        <br/>
        <Button variant="contained" type="submit">Create Business!</Button>
        <p>{errorMessage}</p>
      </form>
    </section>
  );
}

export default CreateCompany;

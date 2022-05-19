import React from "react";
import { get, post } from "../authService/authService";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const FindCompanyById = () => {
  const [companyId, setCompanyId] = React.useState({});
  const [geocodeData, setGeocodeData] = React.useState({})

  const params = useParams();

  React.useEffect(() => {
    get(`/companies/all-companies/${params.id}`)
      .then((response) => {
        //console.log("RESPONSE.DATA", response.data)
        setCompanyId(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //Google Geocoding API
    //Used in Gooogle Geocoding API
    //console.log("LOCATION", location)
    let location2 = "8401 SW 107th Ave Miami FL"
    
    //console.log(location)
    //console.log(location2)
    React.useEffect(() => {
    let location = companyId.address + " " + companyId.city + " " + companyId.state;
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyAk05NcDgWu-jzhgYR_0294MuC2r-_BntY",
        },
      })
      .then((response) => {
        setGeocodeData(response.data.results[0].geometry.location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyId]);
  console.log("GEOCODE DATA", geocodeData)

  //Google Maps API
    const libraries = ["places"];

    const mapContainerStyle = {
        width: "600",
        height: "500"
    }

    const center = {
        lat: geocodeData.lat,
        lng: geocodeData.lng
    }

  const id = localStorage.getItem("id");
  //console.log(id)
  //console.log(companyId.creatorId)

  const navigate = useNavigate();

  function deleteCompany() {
    post(`/companies/all-companies/${params.id}/edit/delete`)
      .then(() => {
        navigate("/all-companies");
      })
      .catch((err) => [console.log(err.message)]);
  }

  return (
    <div>
      <img
        src={companyId.image}
        style={{ width: 50, height: "auto" }}
        alt="companyId_image"
      />
      <p>{companyId.name}</p>
      <p>{companyId.about}</p>
      <p>{companyId.address}</p>
      <p>{companyId.city}</p>
      <p>{companyId.state}</p>
      <p>{companyId.zip}</p>
      <p>{companyId.phone}</p>
      <p>{companyId.email}</p>
      <a style={{ display: "table-cell" }} href={companyId.url} target="_blank">
        {companyId.url}
      </a>
      <br />
      {id === companyId.creatorId && (
        <Link to={`/all-companies/${companyId._id}/edit`}>Edit Page</Link>
      )}
      {id === companyId.creatorId && (
        <button onClick={deleteCompany}>Delete</button>
      )}
    </div>
  );
};

export default FindCompanyById;

import React, { useRef, useCallback } from "react";
import { get, post } from "../authService/authService";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "./FindCompanyById.css"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const FindCompanyById = () => {
  const [companyId, setCompanyId] = React.useState({});
  const [geocodeDataLat, setGeocodeDataLat] = React.useState(0);
  const [geocodeDataLng, setGeocodeDataLng] = React.useState(0);

  //Find Company By ID
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

  //Google Geocoding API
  React.useEffect(() => {
    let location =
      companyId.address + " " + companyId.city + " " + companyId.state;
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyD8Hloyso4xyJAYNWQqbd-iLsgqOxW_qE4",
        },
      })
      .then((response) => {
        console.log("LAT", response.data.results[0].geometry.location.lat);
        console.log("LNG", response.data.results[0].geometry.location.lng);
        setGeocodeDataLat(response.data.results[0].geometry.location.lat);
        setGeocodeDataLng(response.data.results[0].geometry.location.lng);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyId]);
  //console.log("GEOCODE DATA", geocodeData)

  //Google Maps API
  const libraries = ["places"];

  const mapContainerStyle = {
    width: "100vw",
    height: "500px",
  };
  //console.log("Before Passed To Center", geocodeData)
  const center = {
    lat: geocodeDataLat,
    lng: geocodeDataLng,
  };
  console.log("CENTER", center);
  console.log("Geocode Lat", geocodeDataLat);
  console.log("Gecodoe Lng", geocodeDataLng);

  const options = {
    disableDefaultUI: true, // disables default map widget features (zoom, satellite view etc)
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD8Hloyso4xyJAYNWQqbd-iLsgqOxW_qE4",
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <section className="findCompanySection">
      <div className="findCompanyDivParent">
        <img
          className="findCompanyImage"
          src={companyId.image}
          alt="companyId_image"
        />
        <div className="findCompanyDivChild">
          <p>{companyId.name}</p>
          <p className="findCompanyAboutUs">{companyId.about}</p>
          <p>Address: {companyId.address}</p>
          <p>City: {companyId.city}</p>
          <p>State: {companyId.state}</p>
          <p>Zip Code: {companyId.zip}</p>
          <p>Phone: {companyId.phone}</p>
          <p>Email: {companyId.email}</p>
          <a style={{ display: "table-cell" }} href={companyId.url} target="_blank">
            {companyId.url}
          </a>
          <br />
          {id === companyId.creatorId && (
            <Button variant="contained"> <Link className="FindCompanyByIdLink" to={`/all-companies/${companyId._id}/edit`}>Edit Page</Link> </Button>
          )}
          <br/>
          {id === companyId.creatorId && (
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteCompany}>Delete</Button>
          )}
          <br/>
          </div>
        </div>
        <br/>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            options={options}
          >
            {geocodeDataLat && <Marker position={{lat: geocodeDataLat, lng: geocodeDataLng}} />}
          </GoogleMap>
    </section>
  );
};

export default FindCompanyById;

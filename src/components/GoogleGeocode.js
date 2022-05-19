import React from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import axios from "axios";
import {useParams} from "react-router-dom"
import {get} from "../authService/authService"
require("dotenv").config();

const GoogleGeocode = () => {
    const [companyAddress, setCompanyAddress] = React.useState({});
    const [companyCity, setCompanyCity] = React.useState({});
    const [companyState, setCompanyState] = React.useState({});

    const params = useParams();

    React.useEffect(() => {
        get(`/companies/all-companies/${params.id}`)
        .then((response) => {
          console.log("LOOK", response.data)
        })
        .catch((err) => {
          console.log(err.message);
        });
      }, []);

    let location = "22 Main St Boston MA";
    
    return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
            address: location,
            key: "AIzaSyAk05NcDgWu-jzhgYR_0294MuC2r-_BntY"
        }
    })
    .then((response) => {
        console.log("HELLO", response)
    })
    .catch((err) => {
        console.log(err)
    })

    
}


export default GoogleGeocode;

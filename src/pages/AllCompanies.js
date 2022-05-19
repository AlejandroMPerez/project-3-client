import React from "react";
import { get } from "../authService/authService";
import { Link } from "react-router-dom";

function AllCompanies() {
  const [companiesArr, setCompaniesArr] = React.useState([{
    image: "",
    name: "",
    about: "",
    address: "",
    city: "",
    state: "",
    zip: 0,
    phone: 0,
    email: "",
    url: "",
}]);

  React.useEffect(() => {
    get("/companies/all-companies")
    .then((response) => {
      //console.log("RESPONSE.DATA", response)
      setCompaniesArr(response.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);

  return (
    <section>
      <h1>Find Business</h1>
      {companiesArr.map((company,i) => {
        return (
          <div key={i}>
            <img src={company.image} style={{width: 50, height: "auto"}} alt="company_image"/>
            <p>{company.name}</p>
            <p>{company.about}</p>
            <p>{company.city}</p>
            <p>{company.state}</p>
            <Link to={`/all-companies/${company._id}`}>See More Details!</Link>
            <hr/>
          </div> 
        )
        })}
    </section>
  );
}

export default AllCompanies;

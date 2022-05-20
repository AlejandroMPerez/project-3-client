import React from "react";
import { get } from "../authService/authService";
import { Link } from "react-router-dom";
import "./AllCompanies.css"

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
    <section className="allCompaniesSection" >
      {companiesArr.map((company,i) => {
        return (
          <>
          <div className="allCompaniesParentDiv" key={i}>
            <img className="allCompaniesImage" src={company.image} alt="company_image"/>
            <div className="allCompaniesChildDiv">
              <p>{company.name}</p>
              <p className="allCompaniesAboutUs">{company.about}</p>
              <p>{company.city}</p>
              <p>{company.state}</p>
              <Link to={`/all-companies/${company._id}`}>See More Details!</Link>
            </div>
          </div> 
          <br/>
          </>
        )
        })}
    </section>
  );
}

export default AllCompanies;

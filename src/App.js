import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UpdateUser from "./pages/UpdateUser";
import NavBar from "./components/NavBar";
import CreateCompany from "./pages/CreateCompany";
import AllCompanies from "./pages/AllCompanies";
import FindCompanyById from "./pages/FindCompanyById";
import UpdateCompany from "./pages/UpdateCompany";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<UpdateUser />} />
        <Route path="/create" element={<CreateCompany />} />
        <Route path="/all-companies" element={<AllCompanies />} />
        <Route path="/all-companies/:id" element={<FindCompanyById />} />
        <Route path="/all-companies/:id/edit" element={<UpdateCompany />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

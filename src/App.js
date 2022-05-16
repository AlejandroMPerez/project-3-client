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

function App() {
  return (
    <div>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

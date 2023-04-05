import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <h1>Project Management System</h1>
      <div>
        <NavLink className="navLinks" to="/">
          Table View
        </NavLink>
        <NavLink className="navLinks" to="addEmployee">
          Add Employee
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;

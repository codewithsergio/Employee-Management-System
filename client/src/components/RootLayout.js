import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "../css/RootLayout.css";

function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default RootLayout;

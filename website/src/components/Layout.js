import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = ({search, setSearch}) => {
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

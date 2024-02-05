import React from "react";

const Footer = () => {
  return (
    <div className="row m-0 p-0">
      <div className="p-4 footer col-md-12">
        Copyright <i className="bi bi-c-circle" size="sm" /> 2024 Dezigngeeks{" "}
        <img
          alt="logo"
          src={require("../assets/images/DezignGeeks_Logo.png")}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default Footer;

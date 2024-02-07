import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "reactstrap";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const FullLayout = () => {
  return (
    <main>
      {/* <div className="pageWrapper d-lg-flex"> */}
      <div className="pageWrapper">
        {/********header**********/}
        {<Header />}
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
        {/********footer**********/}
        <Footer />
      </div>
      <div>{/* Your other components go here */}</div>
    </main>
  );
};

export default FullLayout;

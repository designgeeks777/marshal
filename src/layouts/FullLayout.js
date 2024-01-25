import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "reactstrap";
import Footer from "./Footer";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Content Area**********/}
        <div className="contentArea">
          {/********header**********/}
          {<Header />}
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
          {/********footer**********/}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default FullLayout;

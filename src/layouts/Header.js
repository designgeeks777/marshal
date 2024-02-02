import React, { useContext, useEffect, useState } from "react";
import { Navbar, Collapse, Dropdown, Button, Row, Col } from "reactstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { CartContext } from "../services/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //to scroll to books display section in welcome page
  const scrollToBooksListSection = (sectionId) => {
    if (location.pathname.substring(1) === "welcome") {
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          window.scrollTo({
            //jerking for buy books from cart page
            top: section.offsetTop - (isSticky ? 50 : 0),
            // top: section.offsetTop - 50,
            behavior: "smooth",
          });
        }, 0);
      }
    } else {
      navigate("/welcome", {
        state: { from: "cart", sectionId: sectionId },
      });
    }
  };

  const { cartItems } = useContext(CartContext);

  return (
    <div className={`stickyHeader ${isSticky ? "sticky" : ""}`}>
      <Navbar className="p-4 bg-white text-primary" dark expand="md">
        {/* <Row className="w-100 me-auto">
          <Col
            xs={10}
            md={6}
            lg={6}
            className="d-flex align-items-center position-relative"
          > */}
        <div className=" d-flex align-items-center">
          <div className="d-flex bg-gradient circle-box me-2"></div>
          <h3 className="me-auto mb-0 gradient">Prophet Marshall Peter</h3>
        </div>
        {/* </Col>
          <Col xs={2} md={6} lg={6} className="d-flex justify-content-end"> */}
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>
        {/* </Col> */}
        <Collapse navbar isOpen={isOpen} className="">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            {/* <DropdownToggle color="transparent"> */}
            <div className="d-flex align-items-center">
              <div
                className="me-auto nav-link text-black"
                onClick={() => {
                  scrollToBooksListSection("aboutSection");
                }}
                style={{ cursor: "pointer" }}
              >
                About Prophet Marshall Peter
              </div>
              <div
                className="mx-4 buyBooksBtn fw-bold btn btn-md btn-block  btn-border-radius"
                onClick={() => {
                  scrollToBooksListSection("booksSection");
                }}
              >
                Buy Books
              </div>
              <div
                className="cartIcon"
                onClick={() => {
                  navigate("/cart");
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  alt="cart"
                  src={require("../assets/images/shoppingCart.png")}
                  width={36}
                  height={36}
                />
                <span className="cartIconQuantity">{cartItems.length}</span>
              </div>
            </div>
          </Dropdown>
        </Collapse>
        {/* </Row> */}
      </Navbar>
    </div>
  );
};

export default Header;

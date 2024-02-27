import React, { useContext, useEffect, useRef, useState } from "react";
import { Navbar, Collapse, Dropdown, Button, Row, Col } from "reactstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { CartContext } from "../services/CartContext";

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
  const headerRef = useRef(null);
  const headerHeight = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      headerHeight.current = headerRef.current.offsetHeight;
    }
  }, []);

  //to scroll to books display section in welcome page
  const scrollToSection = (sectionId) => {
    const headerHeight = headerRef.current.offsetHeight;

    if (location.pathname.substring(1) === "welcome") {
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: "smooth",
          });
        }, 0);
      }
    } else {
      navigate("/welcome", {
        state: {
          from: "other",
          sectionId: sectionId,
          headerHeight: headerHeight,
        },
      });
    }
  };

  const { cartItems } = useContext(CartContext);

  return (
    <div className={`stickyHeader ${isSticky ? "sticky" : ""}`} ref={headerRef}>
      <Navbar className="p-4 bg-white text-primary" dark expand="md">
        <div
          className=" d-flex align-items-center headerMobileView"
          onClick={() => {
            navigate("/welcome");
          }}
        >
          <div className="d-flex bg-gradient circle-box me-2"></div>
          <h3 className="me-auto mb-0 gradient">Prophet Marshall Peter</h3>
        </div>
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
        <Collapse navbar isOpen={isOpen} className="">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <div className="d-flex align-items-center">
              <div
                className="me-auto nav-link text-black"
                onClick={() => {
                  scrollToSection("aboutSection");
                }}
                style={{ cursor: "pointer" }}
              >
                About Prophet Marshall Peter
              </div>
              <div
                className="mx-4 buyBooksBtn fw-bold btn btn-md btn-block  btn-border-radius"
                onClick={() => {
                  scrollToSection("booksSection");
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
      </Navbar>
    </div>
  );
};

export default Header;

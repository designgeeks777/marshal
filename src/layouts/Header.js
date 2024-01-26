import React from "react";
import { Navbar, Collapse, Dropdown, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="p-4 bg-white text-primary" dark expand="md">
        <div className="me-3 d-flex bg-gradient circle-box"></div>
        <h3 className="me-auto mb-0 gradient">Prophet Marshall Peter</h3>
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

        <Collapse navbar isOpen={isOpen}>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            {/* <DropdownToggle color="transparent"> */}
            <div className="d-flex align-items-center">
              <div className="me-auto nav-link text-black">
                About Prophet Marshall Peter
              </div>
              <div className="mx-4 buyBooksBtn fw-bold btn btn-md btn-block  btn-border-radius">
                Buy Books
              </div>
              <img
                alt="cart"
                src={require("../assets/images/shoppingCart.png")}
                width={24}
                height={24}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/cart");
                }}
              />
            </div>
            {/* </DropdownToggle> */}
            {/* <DropdownMenu>
              <DropdownItem onClick={logOut}>Logout</DropdownItem>
            </DropdownMenu> */}
          </Dropdown>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;

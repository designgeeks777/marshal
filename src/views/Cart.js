import React, { useContext, useEffect, useState } from "react";
import CartTable from "../components/CartTable";
import { Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PayModal from "../components/PayModal";
import { CartContext } from "../services/CartContext";

const tableColumns = [
  { column: "coverPic", name: "Book" },
  { column: "bookname", name: "" },
  { column: "price", name: "price" },
  { column: "quantity", name: "quantity" },
  { column: "total", name: "total" },
  { column: "action", name: "Remove" },
];

const Cart = () => {
  const { getCartTotal, cartItems } = useContext(CartContext);
  console.log("CART PAGE>>> ", cartItems);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const pay = () => {
    navigate("/payment");
  };

  const location = useLocation();

  //to scroll to books display section in welcome page
  const scrollToBooksListSection = () => {
    // if (location && location.columnname.substring(1) === "welcome") {
    //   const section = document.getElementById("sectionId");
    //   if (section) {
    //     window.scrollTo({
    //       top: section.offsetTop,
    //       behavior: "smooth",
    //     });
    //   }
    // } else {
    navigate("/welcome", { state: { from: "cart" } });
    // }
  };

  return (
    <>
      <div className="px-4 row text-center d-flex align-items-center">
        <div className="col-4">
          <img
            src={require("../assets/images/cartPageIconLeft.png")}
            alt="cartPageIconLeft"
            className="cartPageIcon"
          />
        </div>
        <div className="col-4">
          <h1 className="px-3 text-primary">Your Cart</h1>
        </div>
        <div className="col-4">
          <img
            src={require("../assets/images/cartPageIconRight.png")}
            alt="cartPageIconRight"
            className="cartPageIcon"
          />
        </div>
      </div>
      <CartTable tableColumns={tableColumns} />
      <div className="border-top"></div>
      <div className="p-4 d-flex justify-content-end ">
        <Button
          // className="btn py-2 mx-3 cartButtons"
          className="px-3 py-2 mx-3 btn btn-md btn-block"
          color="secondary"
          onClick={scrollToBooksListSection}
        >
          Check more books
        </Button>
        <Button
          // className="btn py-2 cartButtons"
          className="px-5 py-2 btn btn-md btn-block"
          color="primary"
          onClick={() => {
            setShow(true);
          }}
          // disabled={
          // }
        >
          Checkout
        </Button>
      </div>
      {show ? (
        <PayModal
          show={show}
          toggle={() => {
            setShow(!show);
          }}
          title="Checkout"
          submitButtonTitle="Done"
          submitButtonClick={() => pay()}
          // disabled={}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex fs-4">
              Pay: <div className="ps-2 text-primary">Rs {getCartTotal()}</div>
            </div>
            <div className="m-4 qrCodeContainer">
              <img src={require("../assets/images/QR_code.png")} alt="qrCode" />
            </div>
          </div>
        </PayModal>
      ) : null}
    </>
  );
};
export default Cart;

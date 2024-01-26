import React, { useEffect, useState } from "react";
import BookDisplay from "../components/BookDisplay";
import ProjectTables from "../components/ProjectTable";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import PayModal from "../components/PayModal";

const tableColumns = [
  { path: "book", name: "Book" },
  { path: "price", name: "price" },
  { path: "quantity", name: "quantity" },
  { path: "total", name: "total" },
  { path: "action", name: "Remove" },
];

const Cart = () => {
  const [tableData, setTableData] = useState([
    {
      id: "1",
      price: "120",
      title: "Vision of prophet",
      image: "book1.png",
      quantity: "1",
      book: [{ title: "Vision of prophet", image: "book1.png" }],
      action: "remove",
    },
    {
      id: "2",
      price: "120",
      title: "Gods Vision for India",
      image: "book1.png",
      quantity: "1",
      book: [{ title: "Gods Vision for India", image: "book1.png" }],
      action: "remove",
    },
    {
      id: "3",
      price: "150",
      title: "Gods Vision for India",
      image: "book2.png",
      quantity: "2",
      book: [{ title: "Gods Vision for India", image: "book2.png" }],
      action: "remove",
    },
    {
      id: "4",
      price: "150",
      title: "Gods Vision for India",
      image: "book1.png",
      quantity: "1",
      action: "remove",
      book: [{ title: "Gods Vision for India", image: "book1.png" }],
    },
    {
      id: "5",
      price: "150",
      title: "Gods Vision for India",
      image: "book2.png",
      quantity: "2",
      action: "remove",
      book: [{ title: "Gods Vision for India", image: "book2.png" }],
    },
    {
      id: "6",
      price: "200",
      title: "Gods Vision for India",
      action: "remove",
      image: "book1.png",
      quantity: "1",
      book: [{ title: "Gods Vision for India", image: "book1.png" }],
    },
    {
      id: "7",
      action: "remove",
      price: "250",
      title: "Gods Vision for Europe",
      image: "book2.png",
      quantity: "2",
      book: [{ title: "Gods Vision for Europe", image: "book2.png" }],
    },
    {
      id: "8",
      price: "300",
      title: "Gods Vision for America",
      image: "book1.png",
      action: "remove",
      quantity: "1",
      book: [{ title: "Gods Vision for America", image: "book1.png" }],
    },
  ]);

  // useEffect(() => {
  // tableData.forEach((object) => {
  //   object["action"] = "remove";
  // });
  // let modifiedData = tableData.map((books) => {
  //   const { title, image, id } = books;
  //   return { title, image, id };
  // });
  // let resultData = tableData.map((d) => {
  //   return {
  //     ...d,
  //     book: modifiedData.filter(({ id }) => d.id === id),
  //   };
  // });
  // // setTableData(resultData.reverse());
  // setTableData((prevValue) => {
  //   const newValue = prevValue + resultData.reverse();
  //   return newValue;
  // });
  // console.log(resultData, "cartpage");
  // }, []);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const pay = () => {
    navigate("/payment");
  };

  const [subTotal, setSubTotal] = useState(0);
  const handleCallback = (subtotalValue) => {
    setSubTotal(subtotalValue);
    console.log("subTotal", subtotalValue);
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
      <ProjectTables
        tableData={tableData}
        tableColumns={tableColumns}
        parentCallback={handleCallback}
      />
      <div className="border-top"></div>
      <div className="p-4 d-flex justify-content-end ">
        <Button
          // className="btn py-2 mx-3 cartButtons"
          className="px-3 py-2 mx-3 btn btn-md btn-block"
          color="secondary"
          onClick={() => {
            navigate("/welcome");
          }}
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
              Pay: <div className="ps-2 text-primary">Rs {subTotal}</div>
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

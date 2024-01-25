import React, { useEffect, useState } from "react";
import BookDisplay from "../components/BookDisplay";
import ProjectTables from "../components/ProjectTable";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

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
      <ProjectTables tableData={tableData} tableColumns={tableColumns} />
      <div className="border-top"></div>
      <div className="p-4 d-flex justify-content-end ">
        <Button
          // className="btn py-2 mx-3 cartButtons"
          className="py-2 mx-3 btn btn-lg btn-block btn-border-radius"
          color="secondary"
          onClick={() => {
            navigate("/welcome");
          }}
        >
          Check more books
        </Button>
        <Button
          // className="btn py-2 cartButtons"
          className="px-5 py-2 btn btn-lg btn-block  btn-border-radius"
          color="primary"
          // onClick={() => update()}
          // disabled={
          // }
        >
          Checkout
        </Button>
      </div>
    </>
  );
};
export default Cart;

import { Table, Spinner } from "reactstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { LoaderContext } from "../services/LoaderContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../services/CartContext";

const CartTable = ({ children, tableColumns }) => {
  const { removeFromCart, getCartTotal, cartItems, updateQuantity } =
    useContext(CartContext);

  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const capitalize = (str) => {
    return str[0]?.toUpperCase() + str.slice(1);
  };

  // get table heading book
  const thData = (book, name) => {
    return (
      <th key={book} className="nowrap border-bottom">
        <div className="cartHeadings">
          {book === "action" ? "" : name === "" ? "" : capitalize(name)}
        </div>
      </th>
    );
  };

  const [editedQuantities, setEditedQuantities] = useState({});

  const handleQuantityChange = (bookId, newQuantity) => {
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setEditedQuantities((prevQuantities) => ({
        ...prevQuantities,
        [bookId]: newQuantity,
      }));

      // Update the quantity in the cart immediately
      updateQuantity(bookId, newQuantity);
    }
  };

  useEffect(() => {
    console.log("CRART TABLE", cartItems);
  }, []);
  // get table row book
  const tdData = () => {
    console.log("TABLE", cartItems);
    return cartItems.map((cartItem, index) => {
      return (
        <tr key={index}>
          {tableColumns.map(({ column }) => {
            return (
              <td className="py-3" key={column}>
                {column === "bookname" || column === "coverPic" ? (
                  <div className="d-flex align-items-center">
                    {column === "coverPic" && (
                      <div className="cartImgContainer">
                        <img src={cartItem[column]} alt="avatar" />
                      </div>
                    )}
                    {column === "bookname" && (
                      <div className="">
                        <h5 className="mb-0 fw-normal">
                          {capitalize(cartItem[column])}
                        </h5>
                      </div>
                    )}
                  </div>
                ) : column === "price" ? (
                  <div className="cartPrice">Rs {cartItem[column]}</div>
                ) : column === "quantity" ? (
                  <div className="ps-3">
                    <input
                      className="cartQuantity shadow-none me-2 mb-0"
                      type="number"
                      min="1"
                      value={
                        editedQuantities[cartItem._id] !== undefined
                          ? editedQuantities[cartItem._id]
                          : cartItem.quantity
                      }
                      onChange={(e) =>
                        handleQuantityChange(cartItem._id, e.target.value)
                      }
                    />
                  </div>
                ) : column === "total" ? (
                  <div className="cartTotal">
                    Rs {(cartItem["price"] * cartItem["quantity"]).toFixed(2)}
                  </div>
                ) : column === "action" ? (
                  <div
                    className="table-actions-button small d-flex justify-content-center"
                    size="sm"
                    onClick={() => {
                      removeFromCart(cartItem);
                    }}
                  >
                    <i className="bi bi-trash pe-1" size="sm"></i>
                    {typeof cartItem[column] === "string"
                      ? capitalize(cartItem[column])
                      : cartItem[column]}
                  </div>
                ) : null}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ height: 250 }}>
          <Spinner color="primary" className="table-spinner" />
        </div>
      ) : cartItems.length === 0 ? (
        <div style={{ height: 250, textAlign: "center", paddingTop: 12 }}>
          <h3>Your cart is empty</h3>
        </div>
      ) : (
        <>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                {tableColumns.map(({ column, name }) => thData(column, name))}
              </tr>
            </thead>
            <tbody>{tdData()}</tbody>
          </Table>
          <div className="border-top"></div>
          <div className="p-4 d-flex justify-content-end align-items-center">
            <h5 className="subTotal">SubTotal :</h5>
            <h4 className="subTotalAmount text-primary">Rs {getCartTotal()}</h4>
          </div>
          <div className="px-4"></div>
        </>
      )}
    </div>
  );
};

CartTable.propTypes = {
  tableData: PropTypes.any,
};

export default CartTable;

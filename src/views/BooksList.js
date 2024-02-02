import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Button,
} from "reactstrap";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LoaderContext } from "../services/LoaderContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../services/CartContext";
import { BASEURL } from "../APIKey";
import axios from "axios";

const BooksList = () => {
  const url = `${BASEURL}books/`;
  const [tableData, setTableData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const getBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      var data = [];
      data = response.data;
      setTableData(data.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const { cartItems, addToCart } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pagesCount = Math.ceil(tableData.length / pageSize);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const BookItem = () => {
    let paginatedTableData = tableData.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );

    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const handleAddCart = async (book) => {
      try {
        await addToCart(book);
        setSelectedItem(book);
        console.log("handleAddCart", selectedItem);
        setTimeout(() => {
          setSelectedItem(null);
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const products = [
      { bookname: "Product 1", price: 19.99, coverPic: "product1.jpg" },
      { bookname: "Product 2", price: 19.99, coverPic: "product2.jpg" },
      { bookname: "Product 3", price: 19.99, coverPic: "product3.jpg" },
      { bookname: "Product 2", price: 29.99, coverPic: "product4.jpg" },
      // Add more products as needed
    ];

    return (
      <div className="bookList">
        {paginatedTableData.map((book, index) => (
          <div className="bookItem" key={index}>
            <div className="bookImgContainer">
              <img
                src={book.coverPic}
                alt={book.bookname}
                className="bookImg"
              />
            </div>
            <div className="bookDetails">
              <legend className="mb-0 ">
                {capitalize(book.bookname)}
              </legend>
              <p className="fw-bold fs-5">${book.price}</p>
              <div className="buttonContainer">
                <Button
                  color="secondary"
                  className="btn btn-md btn-block btn-border-radius"
                  onClick={() => {
                    handleAddCart(book);
                  }}
                >
                  Add to Cart
                </Button>
                {cartItems.length > 0 && (
                  <small
                    className="ps-4 text-primary seeCart"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    See Cart<i className="bi bi-cart-fill"></i>
                  </small>
                )}
                {selectedItem === book && (
                  <div className="d-flex align-items-center text-success pt-1">
                    <i className="bi bi-check-circle-fill"></i>
                    <small>Added to cart succesfully</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      // <div className="row m-0 p-0">
      //   {paginatedTableData.map((book) => (
      //     <div key={book._id} className="col-md-6 bookDisplayItemContainer">
      //       <div className="row">
      //         <div className="col-6 pe-0 responsiveCol align-items-center">
      //           <div className="bookImgContainer">
      //             <img
      //               alt={`Book ${book._id}`}
      //               className="img-fluid"
      //               src={book.coverPic}
      //             />
      //           </div>
      //         </div>
      //         <div className="bookInfo col-6 responsiveCol">
      //           <legend className="mb-0 fw-bold">
      //             {capitalize(book.bookname)}
      //           </legend>
      //           <p className="fw-bold fs-5">Rs {book.price}</p>
      //           <div>
      // <Button
      //   color="secondary"
      //   className="btn btn-md btn-block btn-border-radius buttons"
      //   onClick={() => {
      //     handleAddCart(book);
      //   }}
      // >
      //   Add to Cart
      // </Button>
      // {cartItems.length > 0 && (
      //   <small
      //     className="ps-4 text-primary seeCart"
      //     style={{ cursor: "pointer" }}
      //     onClick={() => {
      //       navigate("/cart");
      //     }}
      //   >
      //     See Cart<i className="bi bi-cart-fill"></i>
      //   </small>
      // )}
      // {selectedItem === book && (
      //   <div className="d-flex align-items-center text-success pt-1">
      //     <i className="bi bi-check-circle-fill"></i>
      //     <small>Added to cart succesfully</small>
      //   </div>
      // )}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   ))}
      // </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner color="primary" className="table-spinner" />
        </div>
      ) : tableData.length === 0 ? (
        <div style={{ height: 250, textAlign: "center", paddingTop: 12 }}>
          <h3>No books</h3>
        </div>
      ) : (
        <BookItem />
      )}
      {tableData.length !== 0 && (
        <Pagination className="d-flex justify-content-center">
          <PaginationItem className="px-1" disabled={currentPage <= 0}>
            <PaginationLink
              onClick={(e) => handleClick(e, currentPage - 1)}
              previous
              href="#"
            />
          </PaginationItem>

          {[...Array(pagesCount)].map((page, i) => (
            <PaginationItem className="px-1" active={i === currentPage} key={i}>
              <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            className="px-1"
            disabled={currentPage >= pagesCount - 1}
          >
            <PaginationLink
              onClick={(e) => handleClick(e, currentPage + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
      )}
    </>
  );
};

BooksList.propTypes = {
  tableData: PropTypes.any,
};

export default BooksList;

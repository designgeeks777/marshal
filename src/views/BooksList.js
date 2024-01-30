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
    return (
      <div className="row m-0 p-0">
        <div>CART {cartItems.length}</div>
        {paginatedTableData.map((book) => (
          <div key={book._id} className="col-md-6 bookDisplayItemContainer">
            <div className="row">
              <div className="col-6 pe-0 responsiveCol align-items-center">
                <div className="bookImgContainer">
                  <img
                    alt={`Book ${book._id}`}
                    className="img-fluid"
                    src={book.coverPic}
                  />
                </div>
              </div>

              <div className="bookInfo col-6 responsiveCol">
                <legend className="mb-0 fw-bold">
                  {capitalize(book.bookname)}
                </legend>
                <p className="fw-bold fs-5">Rs {book.price}</p>
                <Button
                  color="secondary"
                  className="btn btn-md btn-block btn-border-radius buttons"
                  onClick={() => {
                    addToCart(book);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div style={{ height: 250 }}>
          <Spinner color="primary" className="table-spinner" />
        </div>
      ) : tableData.length === 0 ? (
        <div style={{ height: 250 }}>No books</div>
      ) : (
        <div className="bookDisplayContainer">
          <BookItem />
        </div>
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

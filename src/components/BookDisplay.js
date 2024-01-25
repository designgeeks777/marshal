import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Button,
  Row,
  Col,
} from "reactstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { LoaderContext } from "../LoaderContext";
import { useNavigate } from "react-router-dom";

const BookDisplay = ({ tableData }) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [selectedId, setSelectedId] = useState(null);
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

  const enableClick = useRef(false);
  const navigate = useNavigate();

  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };
  const BookItem = () => {
    let paginatedTableData = tableData.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );
    // return paginatedTableData.map((book, index) => {
    //   return (
    return (
      <div className="row m-0 p-0">
        {paginatedTableData.map((book) => (
          <div key={book.id} className="col-md-6 bookDisplayItemContainer">
            <div className="row">
              <div className="col-6 pe-0 responsiveCol align-items-center">
                <div className="bookImgContainer">
                  <img
                    alt={`Book ${book.id}`}
                    className="img-fluid"
                    src={require(`../assets/images/${book.image}`)}
                  />
                </div>
              </div>

              <div className="bookInfo col-6 responsiveCol">
                <legend className="mb-0 fw-bold">{book.title}</legend>
                <p className="fw-bold fs-5">Rs {book.price}</p>
                <Button
                  color="secondary"
                  className="addToCartBtn btn btn-md btn-block btn-border-radius"
                  // onClick={}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    // <div className="bookDisplayItemContainer">
    // <div className="bookImgContainer">
    //   <img
    //     src={require(`../assets/images/${book.image}`)}
    //     alt="bookImage"
    //   />
    // </div>
    // <div className="bookInfo">
    //   <legend className="mb-0 fw-bold">{book.title}</legend>
    //   <small className="text-muted text-black fw-bold">
    //     {book.price}
    //   </small>
    //   <Button
    //     color="secondary"
    //     className="addToCartBtn"
    //     // onClick={}
    //   >
    //     Add to Cart
    //   </Button>
    // </div>
    // </div>
    //   );
    // });
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

BookDisplay.propTypes = {
  tableData: PropTypes.any,
};

export default BookDisplay;

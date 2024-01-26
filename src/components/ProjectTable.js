import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Input,
  Button,
} from "reactstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { LoaderContext } from "../LoaderContext";
import { useNavigate } from "react-router-dom";

const ProjectTables = ({
  children,
  parentCallback,
  tableData,
  tableColumns,
  title,
}) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [selectedId, setSelectedId] = useState(null);
  const tableColumnsCount = useRef(0);
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  // get table tableColumns
  // const tableColumns = Object.keys(tableData[0]);

  const enableClick = useRef(false);
  const navigate = useNavigate();

  // get table heading data
  const thData = (path, name) => {
    return (
      <th key={path} className="nowrap border-bottom">
        <div className="cartHeadings">
          {path === "action" ? "" : capitalize(name)}
        </div>
      </th>
    );
  };

  const onSelectItem = (id) => {
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };

  useEffect(() => {
    setQty();
  }, []);
  const [qty, setQty] = useState(0);
  const handleQuantityChange = (qval) => {
    setQty(qval);
  };

  // get table row data
  const tdData = () => {
    return tableData.map((data, index) => {
      return (
        <tr key={index}>
          {tableColumns.map(({ path }) => {
            return (
              <td className="py-3" key={path}>
                {path === "book" ? (
                  <div className="d-flex align-items-center">
                    {data[path]?.length !== 0 && (
                      <div className="cartImgContainer">
                        <img
                          // src={data[path][0]?.image}
                          src={require(`../assets/images/${data[path][0]?.image}`)}
                          alt="avatar"
                        />
                      </div>
                    )}
                    {data[path]?.length !== 0 && (
                      <div className="ms-4">
                        <h5 className="mb-0 fw-normal">
                          {capitalize(data[path][0]?.title)}
                        </h5>
                      </div>
                    )}
                  </div>
                ) : path === "price" ? (
                  <div className="cartPrice">Rs {data[path]}</div>
                ) : path === "quantity" ? (
                  <div className="ps-3">
                    <div
                      // contentEditable
                      className="cartQuantity"
                      // onInput={handleQuantityChange}
                    >
                      {data[path]}
                    </div>
                  </div>
                ) : // <Input
                // type="text"
                // className="cartQuantity p-2 modal-body-input shadow-none"
                // id="cartQuantity"
                // value={data[path]}
                // onChange={() => {
                //   handleQuantityChange(data[path]);
                // }}
                // />
                path === "total" ? (
                  <div className="cartTotal">
                    Rs {data["price"] * data["quantity"]}
                  </div>
                ) : path === "action" ? (
                  <div
                    className="table-actions-button small d-flex justify-content-center"
                    size="sm"
                    onClick={() => {
                      setIsLoading(true);
                      // console.log("clicked", tableData[index]);
                    }}
                  >
                    <i className="bi bi-trash pe-1" size="sm"></i>
                    {capitalize(data[path])}
                  </div>
                ) : null}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  // Calculate the total sum of the multiplied values
  const calculateTotal = () => {
    let total = tableData.reduce(
      (sum, row) => sum + row.price * row.quantity,
      0
    );
    parentCallback(total);
    return total;
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ height: 250 }}>
          <Spinner color="primary" className="table-spinner" />
        </div>
      ) : tableData.length === 0 ? (
        <div style={{ height: 250 }}>No {title}</div>
      ) : (
        <>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                {tableColumns.map(({ path, name }) => thData(path, name))}
              </tr>
            </thead>
            <tbody>{tdData()}</tbody>
          </Table>
          <div className="border-top"></div>
          <div className="p-4 d-flex justify-content-end align-items-center">
            <h5 className="subTotal">SubTotal:</h5>
            <h4 className="subTotalAmount text-primary">
              Rs {calculateTotal()}
            </h4>
          </div>
          <div className="px-4"></div>
        </>
      )}
    </div>
  );
};

ProjectTables.propTypes = {
  tableData: PropTypes.any,
};

export default ProjectTables;

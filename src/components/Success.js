import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { CartContext } from "../services/CartContext";
import axios from "axios";
import { BASEURL } from "../APIKey";

const Success = () => {
  const navigate = useNavigate();
  const url = `${BASEURL}books/`;
  const { cartItems } = useContext(CartContext);
  useEffect(() => {
    if (cartItems.length > 0) {
      // handleDownloadClick();
    }
  }, []);

  const handleDownloadClick = () => {
    // Replace these URLs and file names with your actual file URLs and names
    if (cartItems.length > 0) {
      const filesToDownload = cartItems.map((file) => {
        const { bookpdf, bookname, _id } = file;
        return { bookpdf, bookname, _id };
      });

      filesToDownload.forEach((file) => {
        updateDownloadCount(file._id);
        downloadFile(file.bookpdf, file.bookname);
      });
    }
  };
  const updateDownloadCount = async (id) => {
    try {
      const response = await axios.put(`${url}${id}/download`);
    } catch (error) {
    }
  };
  const downloadFile = (bookpdf, bookname) => {
    axios
      .get(bookpdf, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        const blobUrl = URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = bookname;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="d-flex align-items-center text-success fs-2">
        <i className="bi bi-check-circle-fill pe-2 fs-1"></i>
        <div>Payment Succesful</div>
      </div>
      <div className="text-success fs-2 my-4">
        Your transaction ID is 12345678. Please save the ID{" "}
      </div>
      <div className="mb-4 text-center">
        Your book(s) are getting downloaded. Please dont refresh/change the page
        till download completes. If your download didnt start automatically,
        click below
      </div>
      <div className="p-4 d-flex justify-content-center">
        <Button
          className="me-3 btn btn-lg  btn-border-radius paymentSuccessBtns"
          color="primary"
          onClick={handleDownloadClick}
        >
          Dowload
        </Button>
        <Button
          className="ms-3 btn btn-lg btn-block btn-border-radius paymentSuccessBtns"
          color="secondary"
          onClick={() => {
            navigate("/cart");
          }}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default Success;

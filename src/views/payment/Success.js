import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { CartContext } from "../../services/CartContext";
import axios from "axios";
import { BASEURL } from "../../APIKey";

const Success = () => {
  const navigate = useNavigate();
  const url = `${BASEURL}books/`;
  const { cartItems, clearCart } = useContext(CartContext);
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
    } catch (error) {}
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
        clearCart();
      })
      .catch((error) => {});
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="d-flex align-items-center text-success fs-4 pb-3">
        <i className="bi bi-check-circle-fill pe-2"></i>
        <div>Purchase request submitted succesfully</div>
      </div>
      <div className="mb-4 text-center">
        We will shortly share you the pdf(s) within 2 working days.Call us on
        +91888767876 if you didn't receive
      </div>
      {/* <div className="p-4 d-flex justify-content-center"> */}
      {/* <Button
          className="me-3 btn btn-lg  btn-border-radius paymentSuccessBtns"
          color="primary"
          onClick={handleDownloadClick}
        >
          Dowload
        </Button> */}
      {/* <Button
          className="ms-3 btn btn-lg btn-block btn-border-radius paymentSuccessBtns"
          color="primary"
          onClick={() => {
            navigate("/welcome");
          }}
        >
          Done
        </Button> */}
      {/* </div> */}
    </div>
  );
};

export default Success;

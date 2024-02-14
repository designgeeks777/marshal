import React, { useContext, useEffect, useRef, useState } from "react";
import CartTable from "../components/CartTable";
import { Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PayModal from "../components/PayModal";
import { CartContext } from "../services/CartContext";
import QRCodeStep from "./payment/QRCodeStep";
import EmailForm from "./payment/EmailForm";
import Success from "./payment/Success";
import { LoaderContext } from "../services/LoaderContext";
import axios from "axios";
import { BASEURL } from "../APIKey";

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
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(
      cartItems.map((item) => {
        const { bookname, quantity } = item;
        return { bookname, quantity };
      })
    );
  }, [cartItems]);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // to scroll to books display section in welcome page
  const scrollToBooksListSection = (sectionId) => {
    navigate("/welcome", {
      state: { from: "other", sectionId: sectionId },
    });
  };

  const [contentIndex, setContentIndex] = useState(0);
  const [formData, setFormData] = useState(null);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  useEffect(() => {
    setContentIndex(0);
  }, []);

  // useEffect(() => {
  //   if (!isFormEmpty) {
  //     setIsFormEmpty(
  //       contentIndex === 1 &&
  //         (formData === null ||
  //           formData.orderedby === "" ||
  //           formData.emailid === "" ||
  //           formData.screenshot === "" ||
  //           formData.phoneNumber === "")
  //     );
  //   }
  // }, [contentIndex, formData, isFormEmpty]);

  const handleFormChange = (data) => {
    setFormData(data);
    // setIsFormEmpty(
    //   contentIndex === 1 &&
    //     (formData === null ||
    //       formData.orderedby === "" ||
    //       formData.emailid === "" ||
    //       formData.screenshot === "" ||
    //       formData.phoneNumber === "")
    // );
  };

  const contents = [
    {
      heading: "Checkout",
      submitButtonText: "Done",
      body: <QRCodeStep />,
    },
    {
      heading: "Please fill out your details so that we can send you the pdfs",
      submitButtonText: "Submit",
      body: <EmailForm onFormChange={handleFormChange} />,
    },
    {
      heading: "",
      submitButtonText: "Done",
      body: <Success />,
    },
  ];

  const resetModalData = () => {
    setFormData(null);
  };

  useEffect(() => {
    setIsFormEmpty(
      contentIndex === 1 &&
        (formData === null ||
          formData.orderedby === "" ||
          formData.emailid === "" ||
          formData.screenshot === "" ||
          formData.phoneNumber === "")
    );
  }, [contentIndex, formData]); // Include formData in the dependency array

  async function getLatestOrderID() {
    const response = await axios.get(`${BASEURL}orders`);
    const orders = response.data;
    let highestOrderID = 0;
    orders.forEach((order) => {
      if (order.orderid > highestOrderID) {
        highestOrderID = order.orderid;
      }
    });
    highestOrderID++;
    return highestOrderID;
  }

  const [orderid, setorderid] = useState(0);
  useEffect(() => {
    if (orderid !== "") {
      setorderid(orderid);
    }
  }, [orderid]);
  const onSubmit = async () => {
    try {
      if (!formData) {
        console.error("Form data is empty.");
        return;
      }
      const imageData = new FormData();
      setIsLoading(true);
      let phoneNumber = "+91" + formData.phoneNumber;
      console.log(orderid);
      // Append values to imageData
      imageData.append("orderid", orderid);
      imageData.append("dateoforder", formData.dateoforder);
      imageData.append("amount", getCartTotal());
      imageData.append("orderedby", formData.orderedby);
      imageData.append("emailid", formData.emailid);
      imageData.append("phone", phoneNumber);
      imageData.append("paymentscreenshot", formData.screenshot);
      books.forEach((book, index) => {
        for (let key in book) {
          imageData.append(`books[${index}][${key}]`, book[key]);
        }
      });
      // for email data
      let output = "\n";
      books.forEach((book, index) => {
        output += `Bookname: ${book.bookname}, Quantity: ${book.quantity}\n`;
        // if (index !== books.length - 1) {
        //   output += "\n";
        // }
      });
      let emailData = {
        to: formData.emailid,
        subject: `New Order received with order number : ${orderid}`,
        message: `Book ordered by : ${formData.orderedby}
Orders : ${output}
Email : ${formData.emailid}
Phone : ${phoneNumber}
Amount : Rs ${getCartTotal()}
`,
      };
      console.log(emailData.message);
      // Make a POST request to send form data to backend
      await axios
        .post(`${BASEURL}orders`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data) {
            setIsLoading(false);
            setContentIndex(contentIndex + 1);
            resetModalData();
            try {
              axios.post(`${BASEURL}/sendEmail`, emailData);
              alert("Email sent successfully!");
            } catch (error) {
              console.error("Error sending email:", error);
              alert("Failed to send email. Please try again later.");
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          resetModalData();
          console.error("POST Error:", error);
        });
    } catch (error) {
      setIsLoading(false);
      // console.error("Error sending data to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitButtonClick = () => {
    if (contentIndex === 0) {
      setContentIndex(contentIndex + 1);
    }
    if (contentIndex === 1 && isFormEmpty) {
      return; // Don't proceed if form data is incomplete
    }
    if (contentIndex === 2) {
      navigate("/welcome");
    } else {
      getLatestOrderID()
        .then((highestOrderID) => {
          setorderid("00" + highestOrderID);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      onSubmit();
      // setContentIndex(contentIndex + 1);
    }
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
      <div className="subTotalContainer">
        {/* // <div className="p-4 d-flex justify-content-end align-items-center">  */}
        <h5 className="subTotal">SubTotal :</h5>
        <h4 className="subTotalAmount text-primary">Rs {getCartTotal()}</h4>
        {/* // </div>  */}
      </div>
      <div className="p-4 d-flex justify-content-end ">
        <Button
          // className="btn py-2 mx-3 cartButtons"
          className="px-3 py-2 mx-3 btn btn-md btn-block"
          color="secondary"
          onClick={() => {
            scrollToBooksListSection("booksSection");
          }}
        >
          Check more books
        </Button>
        <Button
          // className="btn py-2 cartButtons"
          className="px-5 py-2 btn btn-md btn-block"
          color="primary"
          onClick={() => {
            setShowModal(true);
          }}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
      {showModal ? (
        <PayModal
          show={showModal}
          toggle={() => {
            setShowModal(!showModal);
          }}
          title={contents[contentIndex].heading}
          body={contents[contentIndex].body}
          submitButtonTitle={contents[contentIndex].submitButtonText}
          submitButtonClick={handleSubmitButtonClick}
          // disabled={showModal && contentIndex === 1 && isFormEmpty}
        ></PayModal>
      ) : null}
    </>
  );
};
export default Cart;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="d-flex align-items-center text-success fs-2">
        <i class="bi bi-check-circle-fill pe-2 fs-1"></i>
        <div>Payment Succesfull</div>
      </div>
      <div className="text-success fs-2 my-4">
        Your transaction ID is 12345678. Please save the ID{" "}
      </div>
      <div className="mb-4">
        Your book(s) are getting downloaded. Please dont refresh/change the page
        till download completes. If your download didnt start automatically,
        click below
      </div>
      <div className="p-4 d-flex justify-content-center">
        <Button
          className="me-3 btn btn-lg  btn-border-radius paymentSuccessBtns"
          color="primary"
          onClick={() => {
            navigate("/welcome");
          }}
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

import React, { useContext } from "react";
import { CartContext } from "../../services/CartContext";

const QRCodeStep = () => {
  const { getCartTotal } = useContext(CartContext);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex fs-4">
        Pay: <div className="ps-2 text-primary">Rs {getCartTotal()}</div>
      </div>
      <small className="text-danger">
        Note:Please take a screenshot once your payment is succesful
      </small>
      <div className="m-4 qrCodeContainer">
        <img src={require("../../assets/images/QR_code.png")} alt="qrCode" />
      </div>
    </div>
  );
};
export default QRCodeStep;

import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const PayModal = ({
  show,
  toggle,
  children,
  title,
  disabled,
  submitButtonTitle,
  submitButtonClick,
  cancelButtonTitle,
  cancelButtonClick,
}) => {
  return (
    <>
      <div>
        <Modal centered isOpen={show} toggle={toggle}>
          {/* <ModalHeader toggle={toggle}>{title}</ModalHeader> */}
          {title !== "" ? <ModalHeader>{title}</ModalHeader> : null}
          <ModalBody className="pt-4">
            <>{children}</>
          </ModalBody>
          <ModalFooter>
            {/* {cancelButtonTitle !== "" ? (
              <Button
                color="secondary"
                className="modal-btn-secondary"
                onClick={cancelButtonClick}
              >
                {cancelButtonTitle}
              </Button>
            ) : null} */}
            <Button
              color="primary"
              className="mb-4 modal-btn-primary"
              onClick={submitButtonClick}
              disabled={disabled}
            >
              {submitButtonTitle}
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

PayModal.propTypes = {
  show: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default PayModal;

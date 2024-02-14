import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const EmailForm = ({ onFormChange }) => {
  const [emailData, setEmailData] = useState({
    dateoforder: new Date().toLocaleDateString("en-GB"),
    emailid: "",
    orderedby: "",
    screenshot: "",
    phoneNumber: "",
    books: [{ bookname: "", quantity: 0 }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  useEffect(() => {
    if (emailData !== "") {
      setEmailData(emailData);
      onFormChange(emailData);
    }
  }, [emailData]);

  const imgFileInputRef = useRef(null);
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    if (imgFileInputRef.current) {
      imgFileInputRef.current.click();
    }
  };
  const handleFileImgChange = (e) => {
    const file = e.target.files[0];
    setSelectedImgFile(file);
    setEmailData({
      ...emailData,
      screenshot: file,
    });
  };
  useEffect(() => {
    if (emailData.screenshot !== "") {
      setEmailData({
        ...emailData,
        screenshot: selectedImgFile,
      });
    }
  }, [emailData.screenshot]);

  //const handleSubmit = async (e) => {
  // e.preventDefault();
  // try {
  //   await axios.post(`${BASEURL}/sendEmail`, emailData);
  //   alert("Email sent successfully!");
  // } catch (error) {
  //   console.error("Error sending email:", error);
  //   alert("Failed to send email. Please try again later.");
  // }
  // };

  return (
    <>
      <Form>
        <FormGroup>
          <Label
            for="orderedby"
            size="md"
            className="form-label modal-body-label"
          >
            Full Name <span className="text-danger">*</span>
          </Label>
          <Input
            type="text"
            className="form-control modal-body-input shadow-none"
            id="orderedby"
            name="orderedby"
            placeholder=""
            value={emailData.orderedby}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label
            for="screenshot"
            size="md"
            className="form-label modal-body-label"
          >
            Upload Payment Screenshot <span className="text-danger">*</span>
          </Label>
          <div
            className="d-flex custom-file-input-container modal-body-input 
                shadow-none justify-content-between align-items-center py-0"
          >
            <Label
              for="screenshot"
              className="custom-file-input-label py-0 mb-0"
            >
              {emailData.screenshot
                ? emailData.screenshot.name
                : "Upload the screenshot you had saved after payment"}

              <Input
                id="screenshot"
                name="screenshot"
                type="file"
                accept="image/*"
                className="form-control modal-body-input shadow-none"
                onChange={handleFileImgChange}
                ref={imgFileInputRef}
              />
            </Label>
            <Button className="emaiFromBrowseBtn" onClick={handleButtonClick}>
              Browse File
            </Button>
          </div>
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label
                for="emailid"
                size="md"
                className="form-label modal-body-label"
              >
                Email id <span className="text-danger">*</span>
              </Label>
              <Input
                className="form-control modal-body-input shadow-none"
                type="email"
                name="emailid"
                id="emailid"
                placeholder=""
                value={emailData.emailid}
                onChange={handleChange}
                required
              />
              <small style={{ fontSize: 11 }}>
                Please enter correct email id to receive pdfs
              </small>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label
                for="phoneNumber"
                size="md"
                className="form-label modal-body-label"
              >
                Phone/Whatsapp Number <span className="text-danger">*</span>
              </Label>
              <div
                className="d-flex form-control modal-body-input 
                shadow-none justify-content-between align-items-center p-0"
              >
                <Label className="modalPhNo modal-body-input mb-0">91</Label>
                <Input
                  type="number"
                  className="border-0 mx-1 shadow-none"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder=""
                  value={emailData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <small style={{ fontSize: 11 }}>
                Please enter correct whatsapp number to receive pdfs
              </small>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EmailForm;

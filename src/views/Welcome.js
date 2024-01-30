import BooksList from "../views/BooksList";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Access the state object to get the previous location
    const { state } = location;
    const section = document.getElementById("sectionId");
    if (state && state.from) {
      if (state.from === "cart") {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  useEffect(() => {
    navigate("/welcome", { state: { from: "" } });
  }, []);

  return (
    <>
      <div className="d-flex align-items-center flex-wrap">
        <div className="m-4 displayImgContainer align-self-start">
          <img
            src={require("../assets/images/marshalpic.png")}
            alt="marshalpic"
          />
        </div>
        <div className="p-4 description text-primary">
          Hello <br /> <br />I am Prophet Marshall Peter.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud I
          am Prophet Marshall Peter.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud. <br /> <br />I am
          Prophet Marshall Peter.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud. <br />
          <br />
          <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud{" "}
          <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.{" "}
          <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.{" "}
          <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        </div>
      </div>
      <div className="row d-flex align-items-center text-center booksHeading">
        <div className="col-3">
          <img
            src={require("../assets/images/booksIcon.png")}
            alt="booksIcon"
            className="booksIcons"
          />
        </div>
        <div className="col-6">
          <img
            src={require("../assets/images/booksHeading.png")}
            alt="booksHeading"
            className="booksHeadingIcon"
          />
        </div>
        <div className="col-3">
          <img
            src={require("../assets/images/booksIcon.png")}
            alt="booksIcon"
            className="booksIcons"
          />
        </div>
      </div>
      <div id="sectionId">
        <BooksList />
        {/* <Products /> */}
      </div>
    </>
  );
};
export default Welcome;

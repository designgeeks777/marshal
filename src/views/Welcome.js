import BooksList from "../views/BooksList";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Access the state object to get the previous location
    const { state } = location;
    if (state && state.from) {
      if (state.from === "cart" && state.sectionId) {
        const section = document.getElementById(state.sectionId);
        window.scrollTo({
          // top: section.offsetTop - (state.isSticky ? 50 : 0),
          top: section.offsetTop - 50,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  useEffect(() => {
    navigate("/welcome", { state: { from: "", sectionId: "" } });
  }, []);

  return (
    <div>
      <div id="aboutSection" className="d-flex align-items-center flex-wrap">
        <div className="displayImgContainer">
          <img
            src={require("../assets/images/marshalpic.png")}
            alt="marshalpic"
          />
        </div>
        <div className="description text-primary">
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
      <div id="booksSection">
        <div className="booksHeadingContainer">
          <img
            src={require("../assets/images/booksIcon.png")}
            alt="booksIcon"
            className="booksStackImage bookIconLeft"
          />
          <img
            src={require("../assets/images/booksHeading.png")}
            alt="booksHeading"
            className="booksHeadingImage"
          />
          <img
            src={require("../assets/images/booksIcon.png")}
            alt="booksIcon"
            className="booksStackImage bookIconRight"
          />
        </div>
        <div>
          <BooksList />
        </div>
      </div>
    </div>
  );
};
export default Welcome;

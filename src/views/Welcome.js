import BooksList from "../views/BooksList";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Access the state object to get the previous location
    const { state } = location;
    if (state && state.from) {
      if (state.from !== "welcome" && state.sectionId) {
        const section = document.getElementById(state.sectionId);
        window.scrollTo({
          // top: section.offsetTop - (state.isSticky ? 50 : 0),
          top: section.offsetTop - state?.headerHeight,
          behavior: "smooth",
        });
      }
    }
    console.log(location.state);
  }, [location]);

  useEffect(() => {
    navigate("/welcome", {
      state: { from: "", sectionId: "", headerHeight: "" },
    });
  }, []);
  const [opacitySection1, setOpacitySection1] = useState(1);
  const [opacitySection2, setOpacitySection2] = useState(0.5);
  const [imageSlide, setImageSlide] = useState(true);
  const [textSlide, setTextSlide] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setImageSlide(true);
    setTextSlide(true);
  }, []); // Run once when component mounts

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Determine scrolling direction
      const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";

      // Handle sliding animations only on initial load
      if (scrollDirection === "down") {
        // Fade out the about section
        setOpacitySection1(0.5);
      } else {
        // Fade in the about section
        setOpacitySection1(1);
      }

      // Handle sliding animations for the image and text
      if (scrollDirection === "down") {
        setImageSlide(false);
        setTextSlide(false);
      }

      // Update opacity for the books section
      const booksSection = document.getElementById("booksSection");
      if (booksSection) {
        const booksSectionRect = booksSection.getBoundingClientRect();
        const isVisible =
          booksSectionRect.top >= 0 &&
          booksSectionRect.bottom <= window.innerHeight;
        setOpacitySection2(isVisible ? 1 : 0.5);
      }

      // Update last scroll position
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, inView]);

  return (
    <div className="container">
      <div className="section" style={{ opacity: opacitySection1 }}>
        <div
          id="aboutSection"
          className={`d-flex align-items-center flex-wrap`}
          ref={ref}
        >
          <div
            className={`displayImgContainer ${
              imageSlide ? "slide-in-left" : ""
            }`}
          >
            <img
              src={require("../assets/images/marshalpic.png")}
              alt="marshalpic"
            />
          </div>
          <div
            className={`description text-primary ${
              textSlide ? "slide-in-right" : ""
            }`}
          >
            Hello <br /> <br />I am Prophet Marshall Peter.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud. <br /> <br />I am Prophet Marshall Peter.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud. <br />
            <br />
            <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud{" "}
            <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud. <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud
            <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud. <br /> I am Prophet Marshall Peter.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud
          </div>
        </div>
      </div>
      <div className="section" style={{ opacity: opacitySection2 }}>
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
    </div>
  );
};
export default Welcome;

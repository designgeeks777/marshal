import BooksList from "../views/BooksList";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { state } = location;
    if (state && state.from && state.sectionId) {
      const section = document.getElementById(state.sectionId);
      if (section) {
        const headerHeight = state.headerHeight || 0;
        setTimeout(() => {
          window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: "smooth",
          });
        }, 100); // Delay scrolling slightly to allow page to adjust
      }
    }
  }, [location]);
  // This useEffect ensures that when the component mounts, it navigates to the "/welcome" route
  useEffect(() => {
    navigate("/welcome", { replace: true }); // Replace the current entry in the history
  }, [navigate]);

  const [opacitySection1, setOpacitySection1] = useState(1);
  const [opacitySection2, setOpacitySection2] = useState(0.5);
  const [imageSlide, setImageSlide] = useState(true);
  const [textSlide, setTextSlide] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    setImageSlide(true);
    setTextSlide(true);
  }, []); // Run once when component mounts

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const aboutSection = document.getElementById("aboutSection");
      if (aboutSection) {
        const aboutSectionRect = aboutSection.getBoundingClientRect();
        const isAtTop =
          aboutSectionRect.top >= 0 &&
          aboutSectionRect.bottom <= window.innerHeight;
        setOpacitySection1(isAtTop ? 1 : 0.5);
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

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // Dependency array to ensure the effect runs only on mount
  }, []);

  return (
    <div className="container">
      <div className="section" style={{ opacity: opacitySection1 }}>
        <div
          id="aboutSection"
          className={`d-flex align-items-center flex-wrap`}
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

import BookDisplay from "../components/BookDisplay";

const tableData = [
  {
    price: "120",
    title: "Vision of prophet",
    image: "book1.png",
  },
  {
    price: "120",
    title: "Gods Vision for India",
    image: "book1.png",
  },
  {
    price: "150",
    title: "Gods Vision for India",
    image: "book2.png",
  },
  {
    price: "150",
    title: "Gods Vision for India",
    image: "book1.png",
  },
  {
    price: "150",
    title: "Gods Vision for India",
    image: "book2.png",
  },
  {
    price: "200",
    title: "Gods Vision for India",
    image: "book1.png",
  },
  {
    price: "250",
    title: "Gods Vision for Europe",
    image: "book2.png",
  },
  {
    price: "300",
    title: "Gods Vision for America",
    image: "book1.png",
  },
];
const Welcome = () => {
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
      <div className="p-4 m-5 d-flex align-items-center justify-content-center">
        <img
          src={require("../assets/images/booksIcon.png")}
          alt="booksIcon"
          width={182}
          height={120}
          className="booksIcons"
        />
        <img
          src={require("../assets/images/booksHeading.png")}
          alt="booksHeading"
          width={259}
          height={129}
          className="booksHeading"
        />
        <img
          src={require("../assets/images/booksIcon.png")}
          alt="booksIcon"
          width={182}
          height={120}
          className="booksIcons"
        />
      </div>
      <BookDisplay tableData={tableData} />
    </>
  );
};
export default Welcome;

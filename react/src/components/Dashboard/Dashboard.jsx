import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import { useState, useEffect } from "react";
import Axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router";
function Dashboard() {
  /*let navigate = useNavigate();

  const goToStocks = () => {
    return <Navigate to="./App.jsx" />;
  }*/
  const [slideIndex, setSlideIndex] = useState(0);
  const [elementType, setElementType] = useState("div");
  const [elementType2, setElementType2] = useState("div");
  const [newsFact, setNewsFact] = useState("");
  const myStyle = {
    backgroundImage:
      "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const [newsHeader, setNewsHeader] = useState("");
  const [newsImage, setNewsImage] = useState("");
  useEffect(() => {
    getNews();
  }, []);
  async function getNews() {
    await Axios.get(
      "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
    ).then((response) => {
      try {
        console.log(response.data.feed);

        let i = 20;
        setNewsHeader(response.data.feed[i].title);
        setNewsImage(response.data.feed[i].banner_image);
      } catch (error) {
        console.error("Error with API:", error);
      }
    });
  }
  useEffect(() => {
    Axios.get("https://catfact.ninja/fact").then((response) => {
      setNewsFact(response.data.fact);
    });
  }, []);
  const changeEmail = () => {
    setElementType(elementType === "div" ? "input" : "div");
  };
  const handleSelect = (selectedIndex) => {
    setSlideIndex(selectedIndex);
  };
  const changePassword = () => {
    setElementType2(elementType2 === "div" ? "input" : "div");
  };
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [picVar, setPicVar] = useState("");
  const usernameChange = () => {
    console.log(username);
  };
  const passwordChange = () => {
    console.log(password);
  };
  // '/' is default page for routing
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img src={picVar} />
      </div>
      <Tabs
        defaultActiveKey="mainPage"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="mainPage" title="Main">
          <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
            What would you like to do today?
          </h2>
          <div style={{ display: "inline-flex" }}>
            <div class="card" style={{ width: "18rem" }}>
              <img
                src="https://w0.peakpx.com/wallpaper/286/926/HD-wallpaper-lebron-james-los-angeles-lakers-nba-famous-basketball-players-american-basketball-player-art-purple-stone-background-usa-basketball.jpg"
                height="45%"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">Sports</h5>
                <p class="card-text">
                  Catch up with the latest news in sports, players, and teams!
                </p>
                <Link to="/sportsHub">
                  <a href="#" class="btn btn-primary">
                    Visit
                  </a>
                </Link>
              </div>
            </div>
            <div class="card" style={{ width: "18rem" }}>
              <img
                src="https://storage.googleapis.com/research-production/1/2024/06/RS064-Socially-Motivated-Music-Recommendation_1_Without-Logo.png"
                height="45%"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">Music</h5>
                <p class="card-text">
                  Listen to the latest and most popular songs currently out
                  there!
                </p>
                <Link to="/musicHub">
                  <a
                    href="#"
                    style={{ backgroundColor: "purple", borderColor: "purple" }}
                    class="btn btn-primary"
                  >
                    Visit
                  </a>
                </Link>
              </div>
            </div>
            <div class="card" style={{ width: "18rem" }}>
              <img
                src="https://www.analyticssteps.com/backend/media/thumbnail/8517708/4201790_1646043215_What%20are%20StocksArtboard%201%20(1).jpg"
                height="45%"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">Stocks</h5>
                <p class="card-text">
                  View and keep track of stock data from various companies!
                </p>
                <Link to="/stocks">
                  <a
                    style={{
                      backgroundColor: "green",
                      borderColor: "green",
                      color: "white",
                    }}
                    class="btn btn-primary"
                  >
                    Visit
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Your Profile">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Edit profile</Accordion.Header>
              <Accordion.Body>
                <p>Change email</p>
                <input
                  type="text"
                  id="EmailInput"
                  class="form-control"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />{" "}
                <Button type="submit" onClick={usernameChange}>
                  Change
                </Button>
                <p>Change password</p>
                <input type="text" id="PasswordInput" />{" "}
                <Button type="submit">Change</Button>
                <br />
                <div style={{ display: "inline-flex" }}>
                  <div>
                    <p style={{ fontSize: "15px" }}>Current pic</p>
                  </div>
                  <div>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Edit profile pic</Form.Label>
                      <img />
                      <Form.Control type="file" />
                    </Form.Group>
                    <Button>Use pic</Button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <InputGroup className="mb-3">
            <Stack gap={3}>
              <div
                style={{ display: "inline-flex" }}
                className="p-2"
                id="Email"
              >
                {React.createElement(elementType, {
                  type: elementType === "input" ? "text" : null,
                  children: elementType === "div" ? "Email goes here" : null,
                })}
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => changeEmail()}
                >
                  Edit
                </Button>
              </div>
              <div
                style={{ display: "inline-flex" }}
                className="p-2"
                id="Password"
              >
                {React.createElement(elementType2, {
                  type: elementType2 === "input" ? "text" : null,
                  children:
                    elementType2 === "div" ? "Password goes here" : null,
                })}
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => changePassword()}
                >
                  Edit
                </Button>
              </div>
              <div
                style={{ display: "inline-flex" }}
                className="p-2"
                id="Email"
              ></div>
            </Stack>
          </InputGroup>
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
            />
            <label class="form-check-label" for="flexSwitchCheckChecked">
              Switch 1
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              Check 1
            </label>
          </div>
        </Tab>
      </Tabs>

      <br></br>
      <br></br>
      <br></br>
      <Carousel
        style={{ width: "600px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Carousel.Item interval={1500}>
          <img
            src="https://lh6.googleusercontent.com/proxy/NgkNfPvCY8PgW0Rg2WmgVbky9KaATmj8i2eRoq7kQEdgwd7ygtrAXNZMM2JroWOU5gpODQqVBMzxdHaiEpe7ZxKerkqTsCxSdtlcQ54oe_BzEOI9Z0Wg-R7g6m7h2eu6JS5WPMt7rZuspWTVnD4rSvVGIl8"
            className="d-block w-100"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>{newsFact}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            src="https://lh6.googleusercontent.com/proxy/NgkNfPvCY8PgW0Rg2WmgVbky9KaATmj8i2eRoq7kQEdgwd7ygtrAXNZMM2JroWOU5gpODQqVBMzxdHaiEpe7ZxKerkqTsCxSdtlcQ54oe_BzEOI9Z0Wg-R7g6m7h2eu6JS5WPMt7rZuspWTVnD4rSvVGIl8"
            className="d-block w-100"
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>Label for second slide</h3>
            <p>Sample Text for Image three</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img src={newsImage} className="d-block w-100" alt="Image One" />
          <Carousel.Caption>
            <h3>{newsHeader}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Dashboard;
/*
<InputGroup className="mb-3">
    <Form.Control
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <Button variant="outline-secondary" id="button-addon2">
      Button
    </Button>
  </InputGroup>
*/

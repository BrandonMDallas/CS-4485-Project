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
import MainTab from "./MainTab";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
function Dashboard() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [elementType, setElementType] = useState("div");
  const [elementType2, setElementType2] = useState("div");
  const [newsFact, setNewsFact] = useState("");
  const [newsHeader, setNewsHeader] = useState("");
  const [newsImage, setNewsImage] = useState("");
  useEffect(() => {
    //getNews();
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
  const [picVar, setPicVar] = useState(null);
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
          <MainTab />
        </Tab>
        <Tab eventKey="profile" title="Your Profile">
          <ProfileTab />
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <SettingsTab />
        </Tab>
      </Tabs>

      <br></br>
      <br></br>
      <br></br>
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

/*
Carousel code
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
*/

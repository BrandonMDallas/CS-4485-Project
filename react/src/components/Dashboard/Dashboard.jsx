import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Tab } from "react-bootstrap";
import MainTab from "./MainTab";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import styles from "./Dashboard.module.css";
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [newsHeader, setNewsHeader]=useState("")
  const [newsImage, setNewsImage]=useState("")
  useEffect(() => {
      getNews();
  }, [])
  async function getNews(){
    await Axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo").then((response)=> {
      try{
        console.log(response.data.feed)
       
        let i =20;
          setNewsHeader(response.data.feed[i].title);
          setNewsImage(response.data.feed[i].banner_image);
      
        }
        
      catch(error){
        console.error('Error with API:', error);
      }
       
      
    })
  }

  return (
    <>
    
      <Container fluid className={styles.dashboardContainer}>
      <Carousel style={{width: '600px',marginLeft: 'auto', marginRight: 'auto'}}>
        <Carousel.Item interval={1500}>
          <img
          src="https://lh6.googleusercontent.com/proxy/NgkNfPvCY8PgW0Rg2WmgVbky9KaATmj8i2eRoq7kQEdgwd7ygtrAXNZMM2JroWOU5gpODQqVBMzxdHaiEpe7ZxKerkqTsCxSdtlcQ54oe_BzEOI9Z0Wg-R7g6m7h2eu6JS5WPMt7rZuspWTVnD4rSvVGIl8"
            className="d-block w-100"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Music fact</h3>
            <p>Details about the fact go here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
          src="https://lh6.googleusercontent.com/proxy/NgkNfPvCY8PgW0Rg2WmgVbky9KaATmj8i2eRoq7kQEdgwd7ygtrAXNZMM2JroWOU5gpODQqVBMzxdHaiEpe7ZxKerkqTsCxSdtlcQ54oe_BzEOI9Z0Wg-R7g6m7h2eu6JS5WPMt7rZuspWTVnD4rSvVGIl8"
            className="d-block w-100"
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>Sports fact</h3>
            <p>Details about the fact go here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
          src={newsImage}
            className="d-block w-100"
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>{newsHeader}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br></br>
      <br></br>
      <Tab.Container defaultActiveKey="main">
        <Nav variant="pills" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link eventKey="main" className={styles.navLink}>
              Main
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile" className={styles.navLink}>
              Your Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings" className={styles.navLink}>
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className={styles.tabContent}>
          <Tab.Pane eventKey="main">
            <MainTab />
          </Tab.Pane>
          <Tab.Pane eventKey="profile">
            <ProfileTab />
          </Tab.Pane>
          <Tab.Pane eventKey="settings">
            <SettingsTab />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
    </>
    
  );
};

export default Dashboard;

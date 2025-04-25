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
import { parse } from "postcss";
import axios from 'axios';
import Axios from 'axios';

const Dashboard = () => {
  const [newsMusicHeader, setNewsMusicHeader]=useState("")
  const [newsMusicImage, setNewsMusicImage]=useState("")
  const [newsSportsHeader, setNewsSportsHeader]=useState("")
  const [newsSportsImage, setNewsSportsImage]=useState("")
  const [newsStocksHeader, setNewsStocksHeader]=useState("")
  const [newsStocksImage, setNewsStocksImage]=useState("")
  useEffect(() => {
      getNews();
      getMusic();
      getSports();
  }, [])
  async function getNews(){
    await Axios.get("https://newsdata.io/api/1/latest?apikey=pub_8300799f7287d0011392954caa53af0261b69&q=stocks").then((response)=> {
      try{
        console.log(response)
        const parsedData = JSON.parse(JSON.stringify(response));
        setNewsStocksHeader(parsedData.data.results[0].title)
        setNewsStocksImage(parsedData.data.results[0].image_url)
        }
        
      catch(error){
        console.error('Error with API:', error);
      }
       
      
    })
  }
  async function getMusic(){
    await Axios.get("https://newsdata.io/api/1/latest?apikey=pub_8300799f7287d0011392954caa53af0261b69&q=music").then((response)=> {
      try{
        console.log(response)
        const parsedData = JSON.parse(JSON.stringify(response));
        setNewsMusicHeader(parsedData.data.results[0].title)
        setNewsMusicImage(parsedData.data.results[0].image_url)
        }
        
      catch(error){
        console.error('Error with API:', error);
      }
       
      
    })
  }
  async function getSports(){
    await Axios.get("https://newsdata.io/api/1/latest?apikey=pub_8300799f7287d0011392954caa53af0261b69&q=sports").then((response)=> {
      try{
        console.log(response)
        const parsedData = JSON.parse(JSON.stringify(response));
        setNewsSportsHeader(parsedData.data.results[0].title)
        setNewsSportsImage(parsedData.data.results[0].image_url)
        }
        
      catch(error){
        console.error('Error with API:', error);
      }
       
      
    })
  }

  return (
    <>
    
      <Container fluid className={styles.dashboardContainer}>
        <h3 class="display-1" style={{fontSize: '40px'}}>News of the day</h3>
      <Carousel style={{width: '600px',marginLeft: 'auto', marginRight: 'auto'}}>
      <Carousel.Item interval={1500}>
          <img
          src={newsSportsImage}
            className="d-block w-100"
            alt="Image One" style={{width: '200px', height: '400px'}}
          />
          <Carousel.Caption>
            <h3>{newsSportsHeader}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
          src={newsMusicImage}
            className="d-block w-100"
            alt="Image One" style={{width: '400px', height: '400px'}}
          />
          <Carousel.Caption>
            <h3>{newsMusicHeader}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
          src={newsStocksImage}
            className="d-block w-100"
            alt="Image One" style={{width: '200px', height: '400px'}}
          />
          <Carousel.Caption>
            <h3>{newsStocksHeader}</h3>
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

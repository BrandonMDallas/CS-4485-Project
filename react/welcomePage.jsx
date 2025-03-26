import React, { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from 'react-dom/client';
import './App.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import {FaSearch} from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MainMenu from './MainMenu.jsx'
import Stocks from './StocksPage.jsx'
import {createElement} from 'react';
import {Chart as ChartJS, LinearScale, LineElement, CategoryScale, PointElement} from 'chart.js'
import {Line} from 'react-chartjs-2'
import Axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import './App.css'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';

function welcomeFunc() {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return(
    <div style={{backgroundColor: 'black'}}>
    <div style={{display: 'flex', color: 'blue'}} className='container'>
    <div class="rowWelcome" style={{margin: '15px'}}>
  <div class="columnWelcome">
    <img className='img1' style={{zIndex: '1'}} src='https://blog.blairbunting.com/wp-content/uploads/2022/09/Sports-Photographer-Basketball-1.jpg' height="300px"  />
          <img className='img2' style={{zIndex: '1'}} src='https://www.musicteachermagazine.co.uk/media/1rcpdlrr/adobestock_563055013_shotprime-studio-copy.jpg?rxy=0.42539486070739224,0.4302872047106021&width=1002&height=668&bgcolor=White&v=1db08330c18d570' height="300px"/>
  
  </div>
  
  <div class="columnWelcome">
  <img className='img5' style={{zIndex: '1'}} src='https://variety.com/wp-content/uploads/2022/11/Taylor-Swift.jpg?w=1000&h=667&crop=1' height="300px" />

  <img className='img3' style={{zIndex: '1'}} src='https://smartasset.com/wp-content/uploads/sites/2/2023/09/trading-charts-and-data-on-digital-screen-tradingview.jpg_s1024x1024wisk20ctfajIaJEp21Bd6QD4V7KKG8HwgJMOHZa_I_prQKxJ7g.webp'  height="300px"/>
  <img className='img4' style={{zIndex: '1'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowp154pSMbKyZ7JldH3rw79jt95IAJx8QKA&s'  height="300px" />


  </div>
  
  </div>
  
  <br></br>
    </div> 
    <div class="frontComponent" style={{backgroundImage: 'linear-gradient(to right, white, red)'}}>
    <h1 class="bold-italic">Welcome to The Hub!</h1>
    <Link to="/logIn"><button style={{borderRadius: '10px'}}>Log in</button></Link>
    <Link to="/signIn"><button style={{borderRadius: '10px'}}>Create an account</button></Link>
    <Button style={{position: 'absolute', left: '1%', top: '5%'}}onClick={handleShow}>What's The Hub?</Button>
      </div> 
      <div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>About The Hub</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>The Hub is a place where you can catch up and entertain yourself on the latest in: </p>
          <ul>
            <li>Sports</li>
            <li>Music</li>
            <li>Stocks</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
      </div>
  )
}
export default welcomeFunc;

/**
 * 
 * 
 * <div class="row">
  <div class="column">
    <img className='img1' style={{zIndex: '1'}} src='https://blog.blairbunting.com/wp-content/uploads/2022/09/Sports-Photographer-Basketball-1.jpg' height="300px" />
          <img className='img2' style={{zIndex: '1'}} src='https://www.musicteachermagazine.co.uk/media/1rcpdlrr/adobestock_563055013_shotprime-studio-copy.jpg?rxy=0.42539486070739224,0.4302872047106021&width=1002&height=668&bgcolor=White&v=1db08330c18d570' height="300px"/>
      <img className='img3' style={{zIndex: '1'}} src='https://smartasset.com/wp-content/uploads/sites/2/2023/09/trading-charts-and-data-on-digital-screen-tradingview.jpg_s1024x1024wisk20ctfajIaJEp21Bd6QD4V7KKG8HwgJMOHZa_I_prQKxJ7g.webp' height="300px"/>
  </div>
  <div class="column">
    <img src="underwater.jpg">
    <img src="ocean.jpg">
    <img src="wedding.jpg">
    <img src="mountainskies.jpg">
    <img src="rocks.jpg">
    <img src="underwater.jpg">
  </div>
  <div class="column">
    <img src="wedding.jpg">
    <img src="rocks.jpg">
    <img src="falls2.jpg">
    <img src="paris.jpg">
    <img src="nature.jpg">
    <img src="mist.jpg">
    <img src="paris.jpg">
  </div>
  <div class="column">
    <img src="underwater.jpg">
    <img src="ocean.jpg">
    <img src="wedding.jpg">
    <img src="mountainskies.jpg">
    <img src="rocks.jpg">
    <img src="underwater.jpg">
  </div>
</div>
 */

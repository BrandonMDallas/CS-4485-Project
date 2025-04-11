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
import './welcome.css'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import basketball from './basketball.mp4'
import stocks from './stocks.mp4'
import guitar from './guitar.mp4'
import video from './welVidRev.mp4'
function welcomeFunc() {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /*const [myState, setMyState] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setMyState(myState);
      }, 2000);
      
      return () => clearTimeout(timer);
    }, [myState]);*/
    
  return(
    <>
    <div className='main'>
      <div className="overlay">
      <video src={video} autoPlay loop muted/>

        <div className="container">
        <h1 class="bebas-neue-regular" style={{fontSize: '125px'}}>
    Welcome to The Hub!
  </h1>
    <Link to="/logIn"><button style={{borderRadius: '10px'}}>Log in</button></Link>
    <Link to="/signIn"><button style={{borderRadius: '10px'}}>Create an account</button></Link>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleShow}>What's The Hub?</button>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About The Hub</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>The Hub is a place where you can catch up and entertain yourself on the latest in: </p>
          <ul>
            <li>Sports</li>
            <li>Music</li>
            <li>Stocks</li>
          </ul>
          <p>It also features an AI assistant to assist you with <br></br>many needs!</p>
          <br></br>
          <img src="https://www.newhorizons.com/Portals/2/EasyDNNnews/1078/freepik-export-20240927165358ZymJ.jpeg" height="300px" width="465px"/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

        </div>
        
      
      </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <h2 class="quicksand-q1" style={{textAlign: 'left'}}>Get the latest in sports</h2>

<div style={{display: 'flex', justifyContent: 'space-between'}}>

<p class="quicksand-q1">Follow sports teams and catch up with the latest games and events!</p>
<img style={{boxShadow: '2px 2px 5px'}} src='https://media.newyorker.com/photos/59095186019dfc3494e9dab5/master/pass/457771195-290.jpg' />
</div>
<h2 class="quicksand-q1" style={{textAlign: 'left'}}>Treat your ears with the latest music</h2>

<div style={{display: 'flex', justifyContent: 'space-between'}}>
 
<p class="quicksand-q1">Get the latest and most popular songs out there!</p>
<img style={{boxShadow: '2px 2px 5px'}} src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTa5lFnMx8z6c2-GGfPjIe07_Dyd-QYvcjhfKGXD_oPKwWS7tOKPYNuLhBp1CTF3pF4PtL7Om_rerwxO2s3R3GLLw' />
</div>
<br></br>

<br></br>
<h2 class="quicksand-q1" style={{textAlign: 'left'}}>Find out the latest on the most popular stocks right now</h2>
<div style={{display: 'flex', justifyContent: 'space-between'}}>
 
 <p class="quicksand-q1" style={{textAlign: 'left'}}>If you invest or keep up with stocks, The Hub is the perfect site to view the latest in various stocks
  from various companies and the latest in stock news!
 </p>
 <img style={{boxShadow: '2px 2px 5px'}} src='https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1293330840/image_1293330840.jpg?io=getty-c-crop-16-9' height="300px" />
       </div>

      </div>
      
    
     
      </>
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
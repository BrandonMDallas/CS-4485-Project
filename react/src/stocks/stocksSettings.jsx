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


function stocksSetting() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  return(
    <>
   <h1>Settings</h1>
   <div class="container">
  <div class="row">
    <div class="col">
    <h3>Page display</h3>
   <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
        <label class="form-check-label" for="gridRadios2">
          Dark mode
        </label>
      </div>
   <h3>Profile</h3>
   <img />
   <p>Full name: </p>
   <p>Email address: </p>
   <Button>Edit profile</Button>
    </div>
    <div class="col">
    <h3>AI assistant</h3>
   <p>On/off</p>
   <p>Level of accuracy: </p>
   <Button  onClick={handleShow}>
   Allow AI assistant to use some of your information
      </Button>
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What specific information can it have access to?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
          
          </form>
       
      
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
    <div class="col">
    <h3>Type of AI assistant to use</h3>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
        <label class="form-check-label" for="gridRadios1">
          First radio
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
        <label class="form-check-label" for="gridRadios2">
          Second radio
        </label>
      </div>
    </div>
  </div>
</div>
   
  
      
      </>
  )
}
export default stocksSetting;
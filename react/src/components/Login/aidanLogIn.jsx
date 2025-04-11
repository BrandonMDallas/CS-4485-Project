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
import InputGroup from 'react-bootstrap/InputGroup';


function logInPage() {
   const [username, setUserName]=useState("")
    const [password, setPassword]=useState("")
    const sendData=()=> {
      console.log(username);
      console.log(password);
    }
  return(
    <>
   <h1>Log in</h1>
   <p>Enter your username and password</p>
   <InputGroup className="mb-3">
      <InputGroup.Text >Username</InputGroup.Text>
      <Form.Control aria-label="usernameLogin" onChange={(e) => setUserName(e.target.value)}/>
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroup.Text  >Password</InputGroup.Text>
      <Form.Control aria-label="passwordLogin" onChange={(e) => setPassword(e.target.value)}/>
    </InputGroup>
    
  
    <button onClick={()=>sendData()}>Log in</button>
   </>
  )
}
export default logInPage;
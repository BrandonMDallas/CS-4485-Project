import React, { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from 'react-dom/client';
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


function profilePage() {
  const [username, setUserName]=useState("")
  const [password, setPassword]=useState("")
  const usernameChange = () =>
    {
      console.log(username)
    }
    const passwordChange = () =>
      {
        console.log(password)
      }
  return(
    <>
     <div style={{ position: 'absolute', left: '10%', top: '50px'}}>
              <Link to="/stocks"><img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/></Link> 
              </div>
       <h1 style={{position: 'absolute', top: '50px', left: '40%', fontSize: '90px'}}>Your profile </h1>
    <div class="container" style={{color: 'black'}}>
  <div class="row">
    <div class="col">
    <h4>Profile information</h4>
   <p>Profile pic</p>
   <img />
   <p>Full name: </p>
   <p>Email address: </p>
   <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit profile</Accordion.Header>
        <Accordion.Body>
          <p>Change email</p>
          <input type="text" id="EmailInput" 
      class="form-control"
      value={username}
      onChange={(e) => setUserName(e.target.value)}/> <Button type="submit" onClick={usernameChange}>Change</Button>
          <p>Change password</p> 
          <input type="text" id="PasswordInput" class="form-control"
      value={password} onChange={(e) => setPassword(e.target.value)}/> <Button type="submit">Change</Button>
          <br />
          <div style={{display: 'inline-flex'}}>
            <div>
              <p style={{fontSize: '15px'}}>Current pic</p>
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
    </div>
    <div class="col">
      <h4>Friends</h4>
      <ul class="list-group">
  <li class="list-group-item">An item <Button>Message</Button><Button style={{backgroundColor: 'red', color: 'white'}}>Remove</Button></li>
  <li class="list-group-item">An item <Button>Message</Button><Button style={{backgroundColor: 'red', color: 'white'}}>Remove</Button></li>  
  <li class="list-group-item">An item <Button>Message</Button><Button style={{backgroundColor: 'red', color: 'white'}}>Remove</Button></li> 
  <li class="list-group-item">An item <Button>Message</Button><Button style={{backgroundColor: 'red', color: 'white'}}>Remove</Button></li>
</ul>
    </div>
    <div class="col">
      <h4>Account activity</h4>
      <p>Music listened</p>
      <ul>
        <li>

        </li>
      </ul>
      <p>Sports history</p>
<ul>
        <li>
          
        </li>
      </ul>
      <p>Stocks viewed</p>
<ul>
        <li>
          
        </li>
      </ul>
    </div>
  </div>
</div>
   

   
   
      </>
  )
}
export default profilePage;

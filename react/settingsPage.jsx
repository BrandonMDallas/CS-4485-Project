import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReactDOM from 'react-dom/client';
import './src/App.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MainMenu from './MainMenu.jsx'
import Stocks from './Stocks.jsx'
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
    <Link to="/"><div style={{ position: 'fixed', left: '10%', backgroundColor: 'white',
      boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
        <img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/>
        </div></Link> 
    <h1 class="display-5">Settings for The Hub</h1>
<br />
    <div style={{display: 'flex', gap: '20px', height: '500px'}}>
    <Card style={{width: '400px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
      <div style={{display: 'flex'}}>
    <img src="https://www.svgrepo.com/show/131974/settings.svg" alt="Logo" width="50" height="50" style={{position: 'relative', top: '0px', left: '0px'}} />

    <h3 style={{position: 'relative', marginLeft: '20%', marginRight: '60%'}}>General</h3>
</div>
    <div style={{textAlign: 'left'}}>
      <br></br>
      <br></br>
      <h5>Page display</h5>
      <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Dark mode"
      />
      </Form>
    </div>
   </Card>
   <Card style={{width: '400px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
   <div style={{display: 'flex'}}>
   <img style={{position: 'relative', top: '0px', left: '0px'}} src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Logo" width="50px" height="50px"/>
   <h3 style={{position: 'relative', marginLeft: '20%', marginRight: '60%'}}>Profile</h3>
   </div>
    <div style={{textAlign: 'left'}}>
      <br></br>
      <br></br>
    <h5>Account information</h5>
    <p>Change email</p>
    <div style={{display: 'flex'}}>
    <input type="text" 
      class="form-control" placeholder='Type new email here...'/> <button type="submit">Change</button>
    </div>
    
    <p>Change password</p>
    <div style={{display: 'flex'}}>

    <input type="text" 
      class="form-control" placeholder='Type new password here...'/> <button type="submit">Change</button>
    </div>
      </div>
    
   </Card>
   <Card style={{width: '400px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
   <div style={{display: 'flex'}}>

   <img src="https://static.vecteezy.com/system/resources/thumbnails/025/785/710/small_2x/cute-robot-head-icon-logo-design-illustration-bot-robotic-logo-for-business-design-template-with-futuristic-flat-black-minimalist-style-isolated-on-white-background-vector.jpg" style={{position: 'relative', top: '0px', left: '0px'}} alt="Logo" width="50px" height="50px" />
    <h3 style={{position: 'relative', marginLeft: '20%', marginRight: '60%'}}>AI Assistant</h3>
    </div>
    <div style={{textAlign: 'left'}}>
      <br></br>
    <h5>AI functionality</h5>
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="On/Off"
      />
      </Form>
      </div>
   </Card>
    </div>
   
      </>
  )
}
export default stocksSetting;

/**
 * <div style={{height: '100%', width: '190px', padding: '20px', position: 'fixed', zIndex: '1', top: '0', left:'0', backgroundColor:'lightgray'}}>
<h2 style={{fontFamily: 'Arial'}}>Settings</h2>
<br></br>
<br></br>

<div>

<a style={{padding: '6px 8px 30px 16px', fontSize: '15px', display: 'block'}} class="navbar-brand"> <img src="https://www.svgrepo.com/show/131974/settings.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />General</a>
<a style={{padding: '6px 8px 30px 16px', fontSize: '15px', display: 'block'}} class="navbar-brand"><img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/>Profile</a>
<a style={{padding: '6px 8px 30px 16px', fontSize: '15px', display: 'block'}} class="navbar-brand"><img src="https://png.pngitem.com/pimgs/s/179-1798236_bot-icon-hd-png-download.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />AI Assistant</a>
</div>
   </div>
      <div style={{display: 'block', textAlign: 'left'}}>
        Dark mode
      </div>
 */
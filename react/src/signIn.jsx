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


function signInPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUserName]=useState("")
  const [password, setPassword]=useState("")
  const [email, setEmail]=useState("")
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    //setMessage(data.message);
  } catch (error) {
    console.error(error);
    //setMessage('Error submitting data');
  }
};
  const verifyPassword=(e)=> {
    
  }
  
  const handleOnChange = e => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const renderAttachedFilePreview = () => {
    return <div>{selectedFile?.name}</div>;
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(`file ${selectedFile?.name} was submitted`);
  };
  
  return(
    <>
   <h1>Make an account</h1>
   <p>Enter your email address</p>
   <InputGroup className="mb-3">
      <InputGroup.Text>Email</InputGroup.Text>
      <Form.Control aria-label="emailAddress" onChange={(e) => setEmail(e.target.value)}/>
    </InputGroup>
   <p>Enter your username and password</p>
   <InputGroup className="mb-3">
      <InputGroup.Text >Username</InputGroup.Text>
      <Form.Control aria-label="usernameLogin" onChange={(e) => setUserName(e.target.value)}/>
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroup.Text  >Password</InputGroup.Text>
      <Form.Control aria-label="passwordLogin" onChange={(e) => setPassword(e.target.value)}/>
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroup.Text >Re-enter password</InputGroup.Text>
      <Form.Control aria-label="passwordRLogin" onChange={(e) => verifyPassword(e.target.value)}/>
    </InputGroup>
   <p>Enter your first and last name</p>
   <InputGroup className="mb-3">
      <InputGroup.Text>First name</InputGroup.Text>
      <Form.Control aria-label="firstName" />
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroup.Text>Last name</InputGroup.Text>
      <Form.Control aria-label="lastName" />
    </InputGroup>
    <div style={{display: 'flex'}}> 
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Edit profile pic</Form.Label>
      <img />
      <Form.Control type="file"
      onChange={(e)=>{
       handleOnChange(e)
      }}
      
      
      
      />
    </Form.Group>
    </div>
    <p>Preview</p>
    {renderAttachedFilePreview()}
    <button onClick={(event)=>handleSubmit(event)}>Sign up</button>
   </>
  )
}
export default signInPage;

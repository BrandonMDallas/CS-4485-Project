 import React from 'react'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './App.css'
import StocksPage from './App.jsx'
import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router"
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react'


    function MyComponent() {
      /*let navigate = useNavigate();

      const goToStocks = () => {
        return <Navigate to="./App.jsx" />;
      }*/
        const [elementType, setElementType] = useState('div');
        const [elementType2, setElementType2] = useState('div');
     const changeEmail = () =>{
      setElementType(elementType === 'div' ? 'input' : 'div');

     }
     const changePassword = () =>{
      setElementType2(elementType2 === 'div' ? 'input' : 'div');
     }
      return (
        <>
        
        <h1>The-hub</h1>
        <Tabs
      defaultActiveKey="mainPage"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="mainPage" title="Main">
      
      <h2 style={{textAlign: 'center', fontFamily: 'sans-serif'}}>What would you like to do today?</h2>
      <div style={{display: 'inline-flex'}}>
      <div class="card" style={{width: '18rem'}}>
        <img src="https://w0.peakpx.com/wallpaper/286/926/HD-wallpaper-lebron-james-los-angeles-lakers-nba-famous-basketball-players-american-basketball-player-art-purple-stone-background-usa-basketball.jpg" height="45%" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Sports</h5>
          <p class="card-text">Catch up with the latest news in sports, players, and teams!</p>
          <a href="#" class="btn btn-primary">Visit</a>
        </div>
      </div>
      <div class="card" style={{width: '18rem'}}>
        <img src="https://storage.googleapis.com/research-production/1/2024/06/RS064-Socially-Motivated-Music-Recommendation_1_Without-Logo.png" height="45%" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Music</h5>
          <p class="card-text">Listen to the latest and most popular songs currently out there!</p>
          <a href="#" style={{backgroundColor: 'purple', borderColor: 'purple'}} class="btn btn-primary">Visit</a>
        </div>
      </div>
      <div class="card" style={{width: '18rem'}}>
        <img src="https://www.analyticssteps.com/backend/media/thumbnail/8517708/4201790_1646043215_What%20are%20StocksArtboard%201%20(1).jpg" height="45%" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Stocks</h5>
          <p class="card-text">View and keep track of stock data from various companies!</p>
          <a href="#" style={{backgroundColor: 'green', borderColor: 'green', color: 'white'}} class="btn btn-primary">Visit</a>
        </div>
      </div>
      </div>
  
      </Tab>
      <Tab eventKey="profile" title="Profile">
      <InputGroup className="mb-3">
      <Stack gap={3}>
        
        
        <div style={{display: 'inline-flex'}}className="p-2" id="Email">{React.createElement(elementType, {
        type: elementType === 'input' ? 'text' : null,
        children: elementType === 'div' ? 'Email goes here' : null,
      })}
        <Button variant="outline-secondary" id="button-addon2" onClick={() => changeEmail()}>
          Edit
        </Button>
        </div>
        <div style={{display: 'inline-flex'}}className="p-2" id="Password">{React.createElement(elementType2, {
        type: elementType2 === 'input' ? 'text' : null,
        children: elementType2 === 'div' ? 'Password goes here' : null,
      })}
        <Button variant="outline-secondary" id="button-addon2" onClick={() => changePassword()}>
          Edit
        </Button>
        </div>
        <div style={{display: 'inline-flex'}}className="p-2" id="Email">
        <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Edit profile pic</Form.Label>
      <img />
      <Form.Control type="file" />
    </Form.Group>
    <Button>Use pic</Button>
    </div>
    </Stack>
      </InputGroup>
      </Tab>
      <Tab eventKey="settings" title="Settings">
      Put settings content here
    
      </Tab>
    </Tabs>
        </>
        
      );
    }

    export default MyComponent;
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

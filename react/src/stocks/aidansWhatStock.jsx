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


function aiOne() {
  //const choicesArray=['I want the most popular stocks']
  return(
    <>
   <h1>What best describes your financial desires?</h1>
<Form>
{['radio'].map((type) => (
  
        <div key={`default-${type}`} className="mb-3">
          <Form.Check // prettier-ignore
            type={type}
            id={`${type}`}
            label={`I want the most popular stocks`}
          />

<Form.Check // prettier-ignore
            type={type}
            id={`${type}`}
            label={`I want the currently best performing stocks`}
          />

        </div>
        
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      
</Form>
   </>
  )
}
export default aiOne;
/** <Form.Check
            disabled
            type={type}
            label={`disabled ${type}`}
            id={`disabled-default-${type}`}
          /> */
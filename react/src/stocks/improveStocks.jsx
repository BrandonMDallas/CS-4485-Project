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


function aiThree() {
  return(
    <>
   <h1>Based on your current financial status, here's AI's feedback</h1>
   <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Your strengths</Accordion.Header>
        <Accordion.Body>
          <p>Add AI response here</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Areas of improvement</Accordion.Header>
        <Accordion.Body>
          <p>Add AI response here</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Summary</Accordion.Header>
        <Accordion.Body>
          <p>Add AI response here</p>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
   </>
  )
}
export default aiThree;
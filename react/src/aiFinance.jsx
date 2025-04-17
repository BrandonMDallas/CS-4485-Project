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


function aiTwo() {
  return(
    <>
   <h1>Select one of your stocks below for evaluating</h1>

   <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Which stocks should I keep?</Accordion.Header>
        <Accordion.Body>
          <p>Add AI response here</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Which type of other stocks should I invest?</Accordion.Header>
        <Accordion.Body>
          <p>Add AI response here</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Recommended strategies </Accordion.Header>
        <Accordion.Body>
          <p>Add AI response here</p>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      </>
  )
}
export default aiTwo;

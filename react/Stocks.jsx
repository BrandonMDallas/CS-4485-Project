import React, { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from 'react-dom/client';
import './App.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MainPage from './MainPage.jsx'
import {createElement} from 'react';
import {Chart as ChartJS, LinearScale, LineElement, CategoryScale, PointElement} from 'chart.js'
import {Line} from 'react-chartjs-2'
import Axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)

  //JSX doesn't recognize the for loop, we need to use the map function instead for iterating
function App() {
  const graphData=[1, 2, 3, 5, 8, 10, 67, 70];

  const months= ["Jan", "Feb", "March", "April", "May", "June"];
const values = [1, 2, 3, 4, 5, 7];
const companies=['nike', 'starbucks', 'mcdonalds', 'apple', 'google', 'microsoft', 'amazon', 'walmart'];
const company='';
const ctx = document.getElementById("myChart");
 let index=0;
 let variable1="https://logo.clearbit.com/"+companies[0]+".com"
 let variable2='';
 const displayArray = ["https://logo.clearbit.com/"+companies[0]+".com", "https://logo.clearbit.com/"+companies[1]+".com", "https://logo.clearbit.com/"+companies[2]+".com",
  "https://logo.clearbit.com/"+companies[3]+".com", "https://logo.clearbit.com/"+companies[4]+".com", 
  "https://logo.clearbit.com/"+companies[5]+".com", "https://logo.clearbit.com/"+companies[6]+".com", 
 "https://logo.clearbit.com/"+companies[7]+".com"];

  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); 
  variable2=inputValue+' stock'
  console.log({variable2})
  };
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Example Data',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'green',
      borderWidth: 1
    }]
  });
  const chartOptions={
    
      scales: {
          y: {
              beginAtZero: true
          }
      }
  
  }
  const updateData = () => {
    const newData = chartData.datasets[0].data.map(() => Math.floor(Math.random() * 20));
    setChartData({
      ...chartData,
      datasets: [{
        ...chartData.datasets[0],
        data: newData
      }]
    });
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [graphSet, setGraphSet] =useState([]);
  const [makeGraph, setmakeGraph]=useState(false);
  const toggleMakeGraph = () => setmakeGraph(!makeGraph);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  function handleChange(e) {
    setInputValue(e.target.value);
}
  const handleShow2 = () => setShow2(true);
//Ex: var employeeLabel=[], employeeSalaryData=[], employeeAgeData=[]
  let baseurl="https://dummy.restapiexample.com/api/v1/employees/employee";
  const response=async () => {await fetch(baseurl)};
  const LineChartData=async () => {await response.json()}
  /*useEffect(() => {
    Axios.get(`${baseurl}`).then((response)=> {
  setGraphSet(response.data.employee_salary)});
  }, [])*/
  console.log(LineChartData);
  const apiKey="";
 // const baseURL = "https://proxy.cors.sh/"+"http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5";
  /*useEffect(() => {
    const getData= async () => {
      await fetch(`${baseURL}`, {
        method: "GET",
        mode: "cors",
       headers: {
        Authorization: `Bearer: ${token}`,
        "Content-Type": "application/json",
       },
        body: JSON.stringify(data),
    });
    
     console.log(response.json());

}}, [])*/
    
  const graphInstance=document.getElementById("aChart");
    

  const container=document.getElementById("graphSection");
  const addGraph = () => {
    setGraphSet([...graphSet, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Dataset',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'blue',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }]);
  };
 /* const showGraphs = () => {
    {graphSet.map((graphSet, index) => (
      <li key={index}>{graphSet}</li>
    ))}
  }*/
 /*
 <div class="col">
  <div>
  <LineChart />
        </div>
  </div>
  <div class="col">
  <div>
  <LineChart />
        </div>
  </div>*/
        return(
    <>
    <Router>
    <Routes>
      <Route path="/MainPage" element={<MainPage />}></Route>
    </Routes>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
  
    <Link to="./MainPage"><Button>Back</Button></Link>
    </div>
    <h1 class="display-4">StocksHub</h1>
    <div>
    <button class="aiButton">Ask AI assistant for investing advice</button>
    </div>
      <br />
      <div class="yourSection">
        <h2>Your Stocks</h2>
        <Button variant="primary" onClick={handleShow}>
        Edit list below
      </Button>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select what stocks you want to remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
  <label class="form-check-label" for="flexCheckDefault">
    {companies[0]}
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
  <label class="form-check-label" for="flexCheckDefault2">
  {companies[1]}
  </label>
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
<button type="button" class="btn btn-secondary" style={{ display: 'block', margin:'auto', float: 'left' }} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
  Ask AI for further analysis
</button>
<br></br>
<p>Recents</p><br />
<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={updateData}>{companies[0]}</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={updateData}>{companies[1]}</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={updateData}>{companies[2]}</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={updateData}>{companies[3]}</a>
  </li>
</ul>
<br></br>
<br></br>
<form className='add-form'>
<div class="col">
  <div>
  <Line
  data={chartData} options={chartOptions}>
  </Line>
        </div>
  </div>
</form>
</div>
<br></br>
    <div class="moreSection">
        <h2>View more stocks</h2>
        <br></br>
        <div class="card">
  <div class="card-body">
    Here's a list of the currently most popular stocks 
  </div>
  
  <Button variant="primary" onClick={handleShow2}>
        Search for more stocks
      </Button>
<Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Find a stock you want</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        <label>Search for a company
        <input
      type="text"
      value={inputValue}
      onChange={handleChange}
    />
        </label>
        
        <button type="submit" variant="primary">Search</button>
        </form>
        <ul>
          <li>{variable2}</li>
        </ul>
        </Modal.Body>
        
      
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
 
  <div style={{ display: 'flex', flexDirection: 'row' }}>
  {companies.map((item) => (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <img src={displayArray[item]} />
        <Card.Title>{item}</Card.Title>
        <Card.Text>
          Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">View stock</Button>
      </Card.Body>
    </Card>
   ))}
    </div>
</div>

    </div>
    </Router>
    </>
  )
}

export default App


/*
const lineChart = () =>{
  return <div>
    <Line 
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'stock value',
          data: [12, 19, 3, 5, 2, 3], 
        },
      ],
    }}
    height={200}
    width={300}/>
  </div>
}
/*fetch('your_api_endpoint')
.then(response => response.json())
.then(data => {
  // Process data and create chart
  createChart(data);
})
.catch(error => console.error('Error fetching data:', error));

(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();
 

const SimpleLineChart = () => {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}*/
//To add elements dynamically in React, it's recommended to manage an 
// array in the component's state and render elements based on the contents of that array.
/* fetch("https://catfact.ninja/fact").then((res) =>res.json())
.then((data)=>{
  console.log(data);
});*/
//Notes: axios shows everytime the component here updates unless you do mounting
//- How to put variable in a string: use ` instead of " " for the string, ${(const variable goes here)}
//Use . in axios to get the value of an attribute of an object received
//-useState({}) or useState(null) is for making an empty object
// putting a ? before a . of an object means to only access the value of that attribute of that object ONLY IF it's the object
//isn't null
/*useEffectAxios.get("https://catfact.ninja/fact").then((res) => {
  console.log(res.data);
});*/
/*useEffect(() => {
    const getData= async () => {
      const {data} = await axios.get("http://localhost:5000/api/v1/analytics/revenue/lifetime")
    console.log(data)
    }
    getData()
  }, []
<Card style={{ width: '18rem' }}>
      <Card.Body>
      <img src="https://logo.clearbit.com/starbucks.com"></img>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">View stock</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
      <img src="https://logo.clearbit.com/mcdonalds.com"></img>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">View stock</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">Add stock</Button>
      </Card.Body>
    </Card>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
  <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">Add stock</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">Add stock</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">Add stock</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Random stock</Card.Title>
        <Card.Text>
           Brief description of stock goes here.
        </Card.Text>
        <Button variant="primary">Add stock</Button>
      </Card.Body>
    </Card>
  )*/
 //import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement} from 'chart.js'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './App.css'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'


const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
];

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
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
  
    <button>Back</button>
    </div>
    <h1 class="display-4">StocksHub</h1>
    <div>
    <button class="aiButton">Ask AI assistant for investing advice</button>
    </div>
      <br />
      <div class="yourSection">
        <h2>Your Stocks</h2>
        
        <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select what stocks you want to remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
  <label class="form-check-label" for="flexCheckDefault">
    Stock 1
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
  <label class="form-check-label" for="flexCheckDefault2">
    Stock 2
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
<button type="button" class="btn btn-secondary" style={{ display: 'block', margin:'auto', float: 'left'}} data-toggle="tooltip" data-placement="left" title="Tooltip on left">
 Edit organization 
</button>
<br></br>
<br></br>
<div class="row">
  <div class="col">
  <div>
          <SimpleLineChart />
        </div>
  </div>
  <div class="col">
  <div>
  <SimpleLineChart />
        </div>
  </div>
  <div class="w-100"></div>
  <div class="col">
  <div>
  <SimpleLineChart />
        </div>
  </div>
  <div class="col">
  <div>
  <SimpleLineChart />
        </div>
  </div>
</div>
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Search for a company</Form.Label>
        <Form.Control type="text" placeholder="Type here..." />
        </Form.Group>
        </Modal.Body>
        
      
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose2}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
 
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
    </div>
</div>

    </div>
    
    
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

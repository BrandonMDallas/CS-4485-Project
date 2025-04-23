 import React from 'react'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './App.css'
import StocksPage from './StocksPage.jsx'
import { useNavigate } from "react-router"
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import WelcomePage from './welcomePage.jsx'
import Accordion from 'react-bootstrap/Accordion';
import App from './StocksPage.jsx'
import { Link } from 'react-router'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function MyComponent() {
  /*let navigate = useNavigate();

  const goToStocks = () => {
    return <Navigate to="./App.jsx" />;
  }*/
 const [slideIndex, setSlideIndex]=useState(0);
    const [elementType, setElementType] = useState('div');
    const [elementType2, setElementType2] = useState('div');
    const [newsFact, setNewsFact] =useState("");
    const myStyle = {
      backgroundImage:
          "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
      height: "100vh",
      marginTop: "-70px",
      fontSize: "50px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
  };
  const [newsHeader, setNewsHeader]=useState("")
const [newsImage, setNewsImage]=useState("")
useEffect(() => {
  getNews();
}, [])
async function getNews(){
await Axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo").then((response)=> {
  try{
    console.log(response.data.feed)
   
    let i =20;
      setNewsHeader(response.data.feed[i].title);
      setNewsImage(response.data.feed[i].banner_image);
  
    }
    
  catch(error){
    console.error('Error with API:', error);
  }
   
  
})
}
  useEffect(() => {
    Axios.get("https://catfact.ninja/fact").then((response)=> {
  setNewsFact(response.data.fact)});
  }, [])
 const changeEmail = () =>{
  setElementType(elementType === 'div' ? 'input' : 'div');

 }
 const handleSelect = (selectedIndex) => {
  setSlideIndex(selectedIndex);
};
 const changePassword = () =>{
  setElementType2(elementType2 === 'div' ? 'input' : 'div');
 }
 const [username, setUserName]=useState("")
const [password, setPassword]=useState("")
const [picVar, setPicVar]=useState("")
const usernameChange = () =>
{
console.log(username)
}
const passwordChange = () =>
{
console.log(password)
}
 // '/' is default page for routing 
  return (
    <div>
     
    <div style={{ display: 'flex', flexDirection: 'row' }}>

<img src={picVar} />
</div>
<div style={{ position: 'absolute', left: '30%', backgroundColor: 'white',
boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
  <Link to="/welcome"><img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/></Link> 
  </div>

    <h1 class="bebas-neue-regular" style={{fontSize: '130px'}} >The-hub</h1>
    <Carousel style={{width: '600px',marginLeft: 'auto', marginRight: 'auto'}}>
    <Carousel.Item interval={1500}>
      <img
      src="https://lh6.googleusercontent.com/proxy/NgkNfPvCY8PgW0Rg2WmgVbky9KaATmj8i2eRoq7kQEdgwd7ygtrAXNZMM2JroWOU5gpODQqVBMzxdHaiEpe7ZxKerkqTsCxSdtlcQ54oe_BzEOI9Z0Wg-R7g6m7h2eu6JS5WPMt7rZuspWTVnD4rSvVGIl8"
        className="d-block w-100"
        alt="Image One"
      />
      <Carousel.Caption>
        <h3>Music fact</h3>
        <p>Details about the fact go here</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}>
      <img
      src="https://lh6.googleusercontent.com/proxy/NgkNfPvCY8PgW0Rg2WmgVbky9KaATmj8i2eRoq7kQEdgwd7ygtrAXNZMM2JroWOU5gpODQqVBMzxdHaiEpe7ZxKerkqTsCxSdtlcQ54oe_BzEOI9Z0Wg-R7g6m7h2eu6JS5WPMt7rZuspWTVnD4rSvVGIl8"
        className="d-block w-100"
        alt="Image Two"
      />
      <Carousel.Caption>
        <h3>Sports fact</h3>
        <p>Details about the fact go here</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={1500}>
      <img
      src={newsImage}
        className="d-block w-100"
        alt="Image One"
      />
      <Carousel.Caption>
        <h3>{newsHeader}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  <br></br>
  <br></br>
<Tabs
  defaultActiveKey="mainPage"
  id="uncontrolled-tab-example"
  className="mb-3"
>
  <Tab eventKey="mainPage" title="Main">
  
  <h2 style={{textAlign: 'center', fontFamily: 'sans-serif'}}>What would you like to do today?</h2>
  <div style={{display: 'inline-flex', gap: '18px'}}>
  <div class="card" style={{width: '18rem'}}>
    <img src="https://w0.peakpx.com/wallpaper/286/926/HD-wallpaper-lebron-james-los-angeles-lakers-nba-famous-basketball-players-american-basketball-player-art-purple-stone-background-usa-basketball.jpg" height="45%" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Sports</h5>
      <p class="card-text">Catch up with the latest news in sports, players, and teams!</p>
      <Link to="/sportsHub"><button style={{borderRadius: '7px'}}>Visit</button></Link>
    </div>
  </div>
  <div class="card" style={{width: '18rem'}}>
    <img src="https://storage.googleapis.com/research-production/1/2024/06/RS064-Socially-Motivated-Music-Recommendation_1_Without-Logo.png" height="45%" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Music</h5>
      <p class="card-text">Listen to the latest and most popular songs currently out there!</p>
      <Link to="/musicHub"><button style={{borderRadius: '7px'}}>Visit</button></Link>
    </div>
  </div>
  <div class="card" style={{width: '18rem'}}>
    <img src="https://www.analyticssteps.com/backend/media/thumbnail/8517708/4201790_1646043215_What%20are%20StocksArtboard%201%20(1).jpg" height="45%" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Stocks</h5>
      <p class="card-text">View and keep track of stock data from various companies!</p>
      <Link to="/stocks"><button style={{borderRadius: '7px'}}>Visit</button></Link>
    </div>
  </div>
  </div>

  </Tab>
  <Tab eventKey="profile" title="Your Profile">
  <Accordion defaultActiveKey="1">
  <Accordion.Item eventKey="0">
    <Accordion.Header>Edit profile</Accordion.Header>
    <Accordion.Body>
      <p>Change email</p>
      <input type="text" id="EmailInput" 
  class="form-control"
  value={username}
  onChange={(e) => setUserName(e.target.value)}/> <Button type="submit" onClick={usernameChange}>Change</Button>
      <p>Change password</p> 
      <input type="text" id="EmailInput" 
  class="form-control"
  value={password}
  onChange={(e) => setPassword(e.target.value)}/> <Button type="submit">Change</Button>
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
  <InputGroup className="mb-3">
  <Stack gap={3}>
    
    
    
   
    <div style={{display: 'inline-flex'}}className="p-2" id="Email">
      
    
</div>
</Stack>
  </InputGroup>
  </Tab>
  <Tab eventKey="settings" title="Settings">
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
<div style={{display: 'flex', gap: '3px'}}>
<input type="text" 
  class="form-control" placeholder='Type new email here...'/> <button type="submit">Change</button>
</div>

<p>Change password</p>
<div style={{display: 'flex', gap: '3px'}}>

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

  </Tab>
</Tabs>

<br></br>
<br></br>
<br></br>


    </div>
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
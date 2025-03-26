import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './App.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './MainPage.jsx'
import {createElement} from 'react';
import Axios from 'axios';
import AiFinance from './aiFinance.jsx'
import ProfilePage from './profilePage.jsx'
import StocksSettings from './stocksSettings.jsx'
import { Line } from 'react-chartjs-2';
//secure -> environment variable
//openai api: max_tokens is proportional to brain power (bigger request means more tokens)
//.trim() MIGHT get rid of anything in the front or the end of your text
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CgEnter } from 'react-icons/cg';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)

  //JSX doesn't recognize the for loop, we need to use the map function instead for iterating
function StockFunc() {
  const graphData=[1, 2, 3, 5, 8, 10, 67, 70];
  const graphData2=[10, 20, 50, 15];
  
  const graphDatas=[[1, 2, 3, 4, 5], [10, 20, 30, 15, 20], [12, 23, 50, 20]]
  const [dynamicData, setDynamicData]=useState([10, 20, 30, 15])
  const months= ["Jan", "Feb", "March", "April", "May", "June"];
const values = [1, 2, 3, 4, 5, 7];
const companies=['nike', 'starbucks', 'mcdonalds', 'apple', 'google', 'microsoft', 'amazon', 'walmart'];
const company='';
const ctx = document.getElementById("myChart");
var theList=['company1', 'company2', 'company3']
var timeIntervals=['minutes', 'hours', 'days', 'months', 'years']
/*{ id: 1, company: 'company1', graphData: ['Value 1'] },
        { id: 2, company: 'company2', graphData: 'Value 2' },
        { id: 3, company: 'company3', graphData: 'Value 3' }, */
const [list1, setList1] = useState([]);
var preList1=list1;
 let index=0;
 let variable1="https://logo.clearbit.com/"+companies[0]+".com"
 let variable2='';
 const[buttonList, setButtonList]=useState([])
 const displayArray = ["https://logo.clearbit.com/"+companies[0]+".com", "https://logo.clearbit.com/"+companies[1]+".com", "https://logo.clearbit.com/"+companies[2]+".com",
  "https://logo.clearbit.com/"+companies[3]+".com", "https://logo.clearbit.com/"+companies[4]+".com", 
  "https://logo.clearbit.com/"+companies[5]+".com", "https://logo.clearbit.com/"+companies[6]+".com", 
 "https://logo.clearbit.com/"+companies[7]+".com"];
const [checkedItems, setCheckedItems] = useState(
    list1.map((item) => false)
  
);
const removeLike = (indexToRemove) => {
  setList1(list1.filter((_, index) => index !== indexToRemove));
};

const scrollFunc = () => {
  window.scrollTo(800, 500);
}
const addLike = (index) => {
  //Issues here
  let tempArray=list1;
tempArray.push(companies[index])
setList1(tempArray)
setListCount((listCount)=>listCount+1)
//setList1(tempArray)
}
const handleCheckboxChange = (index) => {
  const newCheckedItems = [...checkedItems];
  newCheckedItems[index] = !newCheckedItems[index];
  setCheckedItems(newCheckedItems);
};
const onCheckListSubmit = () =>{
    checkedItems.map((item, index) => {
      if(checkedItems[index]===true){
        removeLike(index);
      }
    })
}
  const [count, setCount] = useState(0)
  const [listCount, setListCount]=useState(0)
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dSelect, setdSelect]=useState('')
   const [savedList, setSavedList]=useState([]);
    const [resultList, setResultList]=useState([]);
    const createRL = () => {
    document.getElementById("resultList").innerHTML+="{resultList}";
    };
  const handleSubmit = (e) => {
    e.preventDefault(); 
  variable2=inputValue+' stock'
  console.log({variable2})
  };
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [1, 2, 3, 4],
      borderColor: 'green',
      borderWidth: 1
    }]
  });
  const [chartOptions, setCharOptions]=useState({
    
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        },
          y: {
            title: {
              display: true,
              text: 'Stock value'
          },
              beginAtZero: true
          }
      }
  
  })
  const updateData = (setArr, value) => {
   
    //setDynamicData(setArr)
    var xLabel, xSide;
    const mins=['10 min', '20 min', '30 min', '40 min', '50 min', '60 min']
    const hours=['8 am', '10 am', '12 pm', '1 pm', '2 pm', '3 pm']
    const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const newData = chartData.datasets[0].data.map((item, index) => Math.floor(setArr[index]));
    if(value===1){
      xSide=mins
      xLabel='minutes'
    }else if(value===2){
      xSide=hours
      xLabel='hours'
    }else if(value===3){
      xSide=months
      xLabel='days'
    }else if(value===4){
      xSide=months
      xLabel='weeks'
    }else if(value===5){
      xSide=months
      xLabel='months'
    }
      setCharOptions(chartOptions => ({ ...chartOptions, scales: {
        x: {
          title: {
            display: true,
            text: xLabel
          }
        },
          y: {
            title: {
              display: true,
              text: 'Stock value'
          },
              beginAtZero: true
          }
      }
   }));
    
    
    setChartData({
      ...chartData,
      labels: xSide,
      datasets: [{
        ...chartData.datasets[0],
        data: newData
      }]
    });
  

  };
  const stockListMulti = () => {

    updateData([6, 12, 18, 24], 2)
    scrollFunc()
  }
  const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [graphSet, setGraphSet] =useState([]);
    const [makeGraph, setmakeGraph]=useState(false);
    const toggleMakeGraph = () => setmakeGraph(!makeGraph);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow3 = () => setShow3(true);
    const handleClose3=() => setShow3(false)
    const handleShow4 = () => setShow4(true);
    const handleClose4=() => setShow4(false)
    const handleShow5 = (value) => {
      setShow5(true);
      setdSelect(value);

    }
    const sendToAI = () => {
      console.log("Request: ", inputValue)
     /* fetch("https://jsonplaceholder.typicode.com/posts").then((response) => response.json()).then((json) => {
        const results = json.filter((postV)=>{
          return value && user && user.name && user.name.toLowerCase().includes(value)
        })
        setResultList(results)
        }
      );*/
    }
    const handleClose5=() => setShow5(false)
    const addbutton = (index) => {
      const newButton =(<button>{companies[index]}</button>);
      setButtons([...buttons, newButton]);
  };
    const fetchInfo=(value) => {
     fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json()).then((json) => {
       const results = json.filter((user)=>{
         return value && user && user.name && user.name.toLowerCase().includes(value/*value entered into the search field */)
       })
       setResultList(results)
       }
     );
   
    }
    const changeDataCond = (index) => {
      if(index===0){
        return <p style={{color: 'red', fontSize: '23px'}}>-{index}</p>
      }
        return <p style={{color: 'green', fontSize: '23px'}}>+{index}</p>
      
     }
     const handleChange = (value) => {
         setInputValue(value)
        //fetchInfo(value)
        const filteredElements = companies.filter((item) =>{
          return item.toLowerCase().includes(value)
        });
        setResultList(filteredElements)
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
  const [newsHeader, setNewsHeader]=useState([])
  const [newsBody, setNewsBody]=useState([])
  const [newsImage, setNewsImage]=useState([])
  const [newsSentiment, setNewsSentiment]=useState([])
  const [newsSource, setNewsSource]=useState([])
  const [newsData, setNewsData]=useState([])
  useEffect(() => {
      getNews();
  }, [])
  async function getNews(){
    await Axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo").then((response)=> {
      try{
        console.log(response.data.feed)
        const newArray1 = [...newsHeader];
        const newArray2 = [...newsBody];
        const newArray3 = [...newsImage];
        const newArray4 = [...newsSentiment];
        const newArray5 = [...newsSource];
        for (let i = 0; i < 8; i++) {
          newArray1.push(response.data.feed[i].title);
          newArray2.push(response.data.feed[i].summary);
          newArray3.push(response.data.feed[i].banner_image);
          newArray4.push(response.data.feed[i].overall_sentiment_score);
          newArray5.push(response.data.feed[i].source);

        }
        setNewsHeader(newArray1);
        setNewsBody(newArray2);
        setNewsImage(newArray3);
        setNewsSentiment(newArray4);
        setNewsSource(newArray5);
        /*const tempArray=[...newsHeader]
        tempArray.map((index, item)=>{
          
          tempArray[index]=response.data.feed[index].title
        })
        setNewsHeader(tempArray)*/
      }catch(error){
        console.error('Error with API:', error);
      }
    })
  }
      
   // setNewsHeader(response.data.feed.title)
   // setNewsImage(response.data.feed.banner_image)
   // setNewsBody(response.data.feed.summary)
    //console.log(newsImage)
    
  

  const container=document.getElementById("graphSection");
  const updateList=()=>{
    useEffect(() => {
      return <li>{list1[listCount]}</li>
      
    }, [listCount])
  }
  
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
   
    <div style={{ display: 'flex', flexDirection: 'row'}}>
    <div style={{ position: 'absolute', left: '10%'}}>
    <Link to="/"><img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/></Link> 
    </div>
    <div style={{ position: 'absolute', right: '20%'}}>
    <Link to="/stocksSetting"> <img style={{backgroundColor: 'white'}} src="https://w7.pngwing.com/pngs/95/869/png-transparent-setting-color-gradient-3d-icon.png" width="50px" height="50px"/></Link>
    <br />Settings
    </div>
    <div style={{ position: 'absolute', right: '10%'}}>
    <Link to="/profilePage">
        <img  src="https://cdn-icons-png.flaticon.com/512/9815/9815472.png" width="50px" height="50px"/>
    </Link><br></br>Profile
      </div>
    
    </div>
    <h1 class="display-4">StocksHub</h1>
    <div>
    <button class="aiButton" onClick={handleShow3}><img src="https://img.freepik.com/premium-photo/friendly-ai-assistant-icon-circular-design-with-modern-aesthetic-generative-ai_437323-33312.jpg" width="150px" height="150px"/> <br></br>Ask AI assistant for investing advice</button>
    <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Ask AI a question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={sendToAI}>
          <input placeholder='Type to search...'
      type="text"
      class="form-control"
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
          </form>
       
       <div class="modal-dialog modal-dialog-scrollable">
       AI response goes here.
</div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
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
        {
              list1.map((item, index) => {
                return <div key={index} class="form-check">
                
                <label class="form-check-label" for="flexCheckDefault">
                  <p>{list1[index]}</p>
                  <button type="button" class="btn btn-danger" onClick={() => removeLike(index)}>Remove item</button>
                </label>
              </div>
              }
            )}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <button type="button" class="btn btn-secondary" style={{ display: 'block', margin:'auto', float: 'left' }} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" onClick={handleShow4}>
  Ask AI for further analysis
</button>
<Modal show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>What do you need help with?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Link to="/whatStock"><button>What stock to invest in</button></Link>
       <Link to="/aifinance"> <button>How well I'm doing with my finances so far</button></Link>
        <Link to="/improveStocks"><button>How I can improve my investing</button></Link>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
<br></br>
<p class="lead">List of your stocks</p><br />
<div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
{
              list1.map((item, index) => {
                return <div key={index}>
                
                <label>
                  <p>{list1[index]}</p>
                  <button type="button" class="btn btn-primary" onClick={()=>updateData([10, 30, 50, 20], 2)}>View stock</button>
                  {changeDataCond(index)}
                </label>
              </div>
              }
            )}
            </div>
<br></br>
<br></br>
<p class="lead">Pick a time interval</p>

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >
{
 
   
     <li class="nav-item" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={()=>updateData([1, 2, 3, 4], 1)}>1 Hour</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([5, 6, 7, 8], 2)}>4 Hours</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([10, 20, 30, 40], 2)}>12 Hours</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160], 2)}>1 day</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160], 3)}>3 days</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160], 4)}>1 week</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160], 5)}>1 month</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160], 5)}>3 months</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160], 5)}>12 months</a>
    </li>
}
              
</ul>
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
    Here's a list of some of the currently most popular stocks 
  </div>
  
  <Button variant="primary" onClick={handleShow2}>
        Search for more stocks
      </Button>
<Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Find a stock you want</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={createRL}>
        <label>Search for a company
        <input 
        placeholder='Type to search...'
      type="text"
      class="form-control"
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
        </label>
        
        </form>
        <div class="results-list" >
            {
              resultList.map((result, index) => {
                return <div className="searchResult" key={index} onClick={(e) => alert(`You clicked on the item ${result}`)}>{result}</div>
              }
            )}
        </div>
        </Modal.Body>
        
      
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
      <ul class="list-group">
        
      <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[0]} height="50px" width="50px"/><h5 class="card-title">       {companies[0]}</h5>
        <p class="card-text">       With supporting text below as a natural lead-in to additional content.</p>
        <Button variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray'}} onClick={() => handleShow5(0)}>About</Button>
        <Button variant="primary" onClick={() =>stockListMulti()}>View stock</Button>
        <Button style={{backgroundColor: 'green', color: 'white', borderColor: 'green'}}  onClick={()=>addLike(0)}>Invest</Button></li>
        <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[1]} height="50px" width="50px"/>
      <h5 class="card-title">{companies[1]}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <Button variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray'}} onClick={() => handleShow5(1)}>About</Button>
        <Button variant="primary" onClick={()=>stockListMulti()}>View stock</Button>
        <Button  style={{backgroundColor: 'green', color: 'white', borderColor: 'green'}} onClick={()=>addLike(1)}>Invest</Button></li>
  <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[2]} height="50px" width="50px"/>
        <h5 class="card-title">{companies[2]}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <Button variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray'}} onClick={() => handleShow5(2)}>About</Button>
        <Button variant="primary" onClick={()=>stockListMulti()}>View stock</Button>
        <Button style={{backgroundColor: 'green', color: 'white', borderColor: 'green'}}  onClick={()=>addLike(2)}>Invest</Button></li>
  <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[3]} height="50px" width="50px"/>
      <h5 class="card-title">{companies[3]}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <Button variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray'}} onClick={() => handleShow5(3)}>About</Button>
        <Button variant="primary" onClick={()=>stockListMulti()}>View stock</Button>
        <Button style={{backgroundColor: 'green', color: 'white',  borderColor: 'green'}}  onClick={()=>addLike(3)}>Invest</Button></li>
  <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[4]} height="50px" width="50px"/>
        <h5 class="card-title">{companies[4]}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <Button variant="primary" style={{backgroundColor: 'gray', color: 'black',  borderColor: 'gray'}} onClick={() => handleShow5(4)}>About</Button>
        <Button variant="primary" onClick={()=>stockListMulti()}>View stock</Button>
        <Button style={{backgroundColor: 'green', color: 'white'}} onClick={()=>addLike(4)}>Invest</Button></li>
  
</ul>
      
  
    <Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton>
          <Modal.Title>About this stock: {companies[dSelect]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Information goes here
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary">View stock</Button>
        <Button variant="primary">Invest</Button>
        </Modal.Footer>
      </Modal>
</div>

    </div>
    <h2>Latest in news</h2>
   <div style={{display: 'flex'}}>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[0]} />
      <Card.Body>
        <Card.Title>{newsHeader[0]}</Card.Title>
        <Card.Text>
          {newsBody[0]}
        </Card.Text>
        <Button variant="primary">More information</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[1]} />
      <Card.Body>
        <Card.Title>{newsHeader[1]}</Card.Title>
        <Card.Text>
          {newsBody[1]}
        </Card.Text>
        <Button variant="primary">More information</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[2]} />
      <Card.Body>
        <Card.Title>{newsHeader[2]}</Card.Title>
        <Card.Text>
          {newsBody[2]}
        </Card.Text>
        <Button variant="primary">More information</Button>
      </Card.Body>
    </Card>
   </div>
   
   <div style={{display: 'flex'}}>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[3]} />
      <Card.Body>
        <Card.Title>{newsHeader[3]}</Card.Title>
        <Card.Text>
          {newsBody[3]}
        </Card.Text>
        <Button variant="primary">More information</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[4]} />
      <Card.Body>
        <Card.Title>{newsHeader[4]}</Card.Title>
        <Card.Text>
          {newsBody[4]}
        </Card.Text>
        <Button variant="primary">More information</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[5]} />
      <Card.Body>
        <Card.Title>{newsHeader[5]}</Card.Title>
        <Card.Text>
          {newsBody[5]}
        </Card.Text>
        <Button variant="primary">More information</Button>
      </Card.Body>
    </Card>
   </div>
    </>
  )
}
//For automatic scrolling: window.scrollTo(500, 0);
export default StockFunc

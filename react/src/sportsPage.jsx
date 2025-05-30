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
import Table from 'react-bootstrap/Table';
import './App.jsx'
//import './moreNews.jsx'
//import Extranews from './moreNews.jsx'
//secure -> environment variable
//openai api: max_tokens is proportional to brain power (bigger request means more tokens)
//.trim() MIGHT get rid of anything in the front or the end of your text
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CgEnter } from 'react-icons/cg';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
)

  //JSX doesn't recognize the for loop, we need to use the map function instead for iterating
function StockFunc() {
  const graphData=[1, 2, 3, 5, 8, 10, 67, 70];
  const graphData2=[10, 20, 50, 15];
  const [currTime, setCurrTime]=useState(new Date())
  useEffect(() => {
    const changeTime = setInterval(() => {
      setCurrTime(new Date());
    }, 1000); 

    return () => clearInterval(changeTime);
  }, []);
  const graphDatas=[[1, 2, 3, 4, 5], [10, 20, 30, 15, 20], [12, 23, 50, 20]]
  const [dynamicData, setDynamicData]=useState([10, 20, 30, 15])
  const months= ["Jan", "Feb", "March", "April", "May", "June"];
const values = [1, 2, 3, 4, 5, 7];
const companies=['NKE', 'SBUX', 'MCD', 'AAPL', 'GOOG', 'MSFT', 'AMZN', 'WMT'];
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
 let variable1="https://assets.parqet.com/logos/symbol/"+companies[0]+"?format=png"
 let variable2='';
 const[buttonList, setButtonList]=useState([])
 const displayArray = ["https://assets.parqet.com/logos/symbol/"+companies[0]+"?format=png", "https://assets.parqet.com/logos/symbol/"+companies[1]+"?format=png", "https://assets.parqet.com/logos/symbol/"+companies[2]+"?format=png",
  "https://assets.parqet.com/logos/symbol/"+companies[3]+"?format=png", "https://assets.parqet.com/logos/symbol/"+companies[4]+"?format=png", 
  "https://assets.parqet.com/logos/symbol/"+companies[5]+"?format=png", "https://assets.parqet.com/logos/symbol/"+companies[6]+"?format=png", 
"https://assets.parqet.com/logos/symbol/"+companies[7]+"?format=png"];
const [checkedItems, setCheckedItems] = useState(
    list1.map((item) => false)
  
);
const removeLike = (indexToRemove) => {
  setList1(list1.filter((_, index) => index !== indexToRemove));
};
const todayDate = new Date();
  const displayDate = todayDate.toLocaleDateString();
const scrollFunc = (value) => {
  window.scrollTo(0, value);
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
    const [dataOpenPoints, setDataOpenPoints]=useState([])
  const [dataLowPoints, setDataLowPoints]=useState([])
  const [dataHighPoints, setDataHighPoints]=useState([])
  const [dataClosePoints, setDataClosePoints]=useState([])
  const [dataVolumePoints, setDataVolumePoints]=useState([])
  const [dataPoints, setDataPoints]=useState([])
  const [xPoints, setXPoints]=useState([])
var volumePoints=[];
  async function getStock(value, value2){
   await Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${value}&interval=30min&outputsize=full&apikey=32C6KJ3LT0U5QPAN`).then((response)=>{
    console.log("Response: ", response)
    console.log("value of comp: ", value);
    let array1=[]
    let array2=[]
    for(var key in response.data['Time Series (30min)']){
      array1.push(response.data['Time Series (30min)'][key]['1. open'])
      array2.push(key)
    }
    setDataPoints(array1)
    setXPoints(array2)
    console.log(xPoints)
    console.log(dataPoints)
    //console.log(volumePoints)
   }
   
     
    
   )
  }
  useEffect(()=> {
    /**
     * const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('API_ENDPOINT_1'),
          fetch('API_ENDPOINT_2'),
        ]);

        if (!response1.ok || !response2.ok) {
          throw new Error('Failed to fetch data');
        }

        const json1 = await response1.json();
        const json2 = await response2.json();

        setData1(json1);
        setData2(json2);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
     */
      getStock('IBM', 5);
      getComp("IBM")
      getNews();
  }, [])
  const [descV, setDescV]=useState("")
  async function getComp(value){
    await Axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${value}&apikey=32C6KJ3LT0U5QPAN`).then((response)=>{
      const parsedData = JSON.parse(JSON.stringify(response));
      setDescV(parsedData.data.Description)
    
     console.log("parsedData: ", descV);
    }
    
      
     
    )
   }
  const handleSubmit = (e) => {
    e.preventDefault(); 
  variable2=inputValue+' stock'
  console.log({variable2})
  };
  const [chartData, setChartData] = useState({
    labels: xPoints,
    datasets: [{
      data: dataPoints,
      borderColor: 'green',
      borderWidth: 1
    }]
  });
  const [chartData2, setChartData2] = useState({
    labels: xPoints,
    datasets: [{
      data: dataPoints,
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
  
 
 /* */
  const [abSelect, setAbSelect]=useState('')
  const compParams = (value, value2) => {
    getComp(value)
    setAbSelect(value2)
    handleShow7()
  }
  const updateData = (nameStock, value) => {
   
    //setDynamicData(setArr)
    getStock(nameStock, 5)
    var xLabel, xSide;
    var lineColor='green'
    const day=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const hour=[xPoints[0], xPoints[1], xPoints[2], xPoints[3], xPoints[4], xPoints[5], xPoints[6], xPoints[7], xPoints[8], xPoints[9], xPoints[10], xPoints[11], xPoints[12], xPoints[13], xPoints[14]];
    //console.log('X version', hour)
    const month=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    //const year=['']
   // const arrayPoints=setArr.map(stri => parseFloat(stri));
    //console.log('Points version', arrayPoints)
    const newData = chartData2.datasets[0].data.map((item, index) => Math.floor(parseFloat(dataPoints[index])));
   /* if(setArr[0]>setArr[setArr.length-1]){
      lineColor='red';
          }*/
    if(value===1){
      xSide=hour
      xLabel='Specific time'
    }else if(value===2){
      xSide=day
      xLabel='Days'
    }else if(value===3){
      xSide=month
      xLabel='Months'
    }else if(value===4){
      xSide=[xPoints[650], xPoints[600], xPoints[500], xPoints[400], xPoints[300], xPoints[200], xPoints[100], xPoints[0]]
      xLabel='Specific date'
    }

    if((Number(dataPoints[dataPoints.length-1]).toFixed(2))>(Number(dataPoints[0]).toFixed(2))){
      lineColor='red'
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
        ...chartData.datasets[0],data: dataPoints,
        borderColor: lineColor
      }]
    });
  

  };
  const [currentGraph, setCurrentGraph]=useState("")

  const stockListMulti = (value, value2) => {
    setCurrentGraph(value)
    updateData(value, 2)
    scrollFunc(value2)
  }
  const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const [show7, setShow7] = useState(false);

    const [graphSet, setGraphSet] =useState([]);
    const [makeGraph, setmakeGraph]=useState(false);
    const toggleMakeGraph = () => setmakeGraph(!makeGraph);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow3 = () => setShow3(true);
    const handleClose3=() => setShow3(false)
    const handleShow4 = () => setShow4(true);
    const handleClose6 = () => setShow6(false);
    const handleClose4=() => setShow4(false)
    const handleShow7 = () => setShow7(true);
    const handleClose7 = () => setShow7(false);

    const handleShow5 = (value) => {
      setShow5(true);
      setdSelect(value);

    }
    const handleShow6 = (value) => {
      setShow6(true);
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
      let differenceV=dataPoints[1]-dataPoints[0]
      if(differenceV<0){
        return <p style={{color: 'red', fontSize: '23px'}}>{differenceV}</p>
      }else{}
       return <p style={{color: 'green', fontSize: '23px'}}>+{differenceV}</p>
      
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
    const [isHidden, setHidden]=useState(true);
    const [isHidden2, setHidden2]=useState(false);
    const [isHidden3, setHidden3]=useState(false);

    const changeHidden = () =>{
      setHidden(false)
      setHidden2(true)
    }
   const addMoreNews = () =>{
    setHidden3(true)
   }
  const graphInstance=document.getElementById("aChart");
  const [companyName, setCompanyName]=useState("")
  const [newsHeader, setNewsHeader]=useState([])
  const [newsBody, setNewsBody]=useState([])
  const [newsImage, setNewsImage]=useState([])
  const [newsSentiment, setNewsSentiment]=useState([])
  const [newsSource, setNewsSource]=useState([])
  const [newsSourceDomain, setNewsSourceDomain]=useState([])
  const [newsData, setNewsData]=useState([])
  
  async function getNews(){
    await Axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo").then((response)=> {
      try{
        const parsedData = JSON.parse(JSON.stringify(response));
        console.log("Raw news", response)
       
        const newArray1 = [...newsHeader];
        const newArray2 = [...newsBody];
        const newArray3 = [...newsImage];
        const newArray4 = [...newsSentiment];
        const newArray5 = [...newsSource];
        const newArray6 = [...newsSourceDomain];

        for (let i = 0; i < 12; i++) {
          newArray1.push(response.data.feed[i].title);
          newArray2.push(response.data.feed[i].summary);
          newArray3.push(response.data.feed[i].banner_image);
          newArray4.push(response.data.feed[i].overall_sentiment_score);
          newArray5.push(response.data.feed[i].source);
          newArray6.push(response.data.feed[i].url)
        }
        setNewsHeader(newArray1);
        setNewsBody(newArray2);
        setNewsImage(newArray3);
        setNewsSentiment(newArray4);
        setNewsSource(newArray5);
        setNewsSourceDomain(newArray6);
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
    
    const goToSite = (value) => {
      window.open(newsSourceDomain[value]);
    }

  const container=document.getElementById("graphSection");
  const updateList=()=>{
    useEffect(() => {
      return <li>{list1[listCount]}</li>
      
    }, [listCount])
  }
  /*const visitClick = () =>{
    window.open(newsSourceDomain[dSelect]);

  }*/
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
   <div style={{ backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px'}}>
    <div style={{ display: 'flex', flexDirection: 'row'}}>
    <Link to="/"><div style={{ position: 'absolute', left: '24%', backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
    <img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/>
    </div></Link> 
    <Link to="/stocksSetting"><div style={{ position: 'absolute', right: '26.5%', backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
     <img style={{backgroundColor: 'white'}} src="https://w7.pngwing.com/pngs/953/757/png-transparent-setting-3d-icon.png" width="50px" height="50px"/>
    <br />Settings
    </div></Link>
    <Link to="/profilePage"><div style={{ position: 'absolute', right: '20.5%', backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
    
        <img  src="https://cdn-icons-png.flaticon.com/512/9815/9815472.png" width="50px" height="50px"/>
    <br></br>Profile
      </div></Link>
    
    </div>
    <h1 className="modern-title mb-0" style={{fontSize: '60px'}}>StocksHub</h1>
    </div>
    <p class="lead">Today's date and time: {displayDate} {currTime.toLocaleTimeString()}</p>
    <div>
    <button class="aiButton" style={{borderRadius: '8px'}} onClick={handleShow3}><img style={{borderRadius: '8px'}} src="https://static.vecteezy.com/system/resources/previews/004/639/658/non_2x/sun-icon-on-white-background-vector.jpg" width="250px" height="150px"/> <br></br>Ask AI assistant for investing advice</button>
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
      <div class="yourSection" style={{ backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
        <h2>Stock data</h2>
        <Button variant="primary" onClick={handleShow} style={{ display: 'block', margin:'auto', float: 'right'}}>
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
      <button type="button" class="btn btn-secondary" style={{ display: 'block', margin:'auto', float: 'left'}} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" onClick={handleShow4}>
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
<div class="divStyle">

<br></br>
<br></br>
<div style={{ borderRadius: "12px", backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)'}}>
<p class="lead" style={{position: 'absolute', left: '45%', right: '45%'}}>Your stocks</p><br /><br />
<div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
{
              list1.map((item, index) => {
                return <div key={index} style={{ boxShadow: '5px 5px 10px rgba(7, 144, 18, 0.6)', borderRadius: '12px', backgroundColor: 'lightgreen', margin: '10px' }}>
                
                <label>
                  <p>{list1[index]}</p>
                  
                  <Line
  data={chartData} options={chartOptions} height={200} width={200}>
  </Line>
                  <button type="button" class="btn btn-primary" onClick={()=>stockListMulti(list1[index], 850)}>View stock</button>
                  {changeDataCond(index)}
                </label>
              </div>
              }
            )}
            </div>
</div>

            </div>
<br></br>
<br></br>
<p class="lead">Pick a time interval</p>

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ display: 'block', margin:'auto', float: 'middle'}}>
{
 
   
     <li class="nav-item" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}} class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={()=>updateData(dataPoints, 1)}>Hour</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(dataOpenPoints, 2)}>Day</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(dataOpenPoints, 3)}>Month</a>
      <a style={{backgroundColor: 'lightgray', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(dataOpenPoints, 4)}>Year</a>

    </li>
}
              
</ul>
<form className='add-form' >
  <div>
<div class="col">
  <div>
   <p class="lead" >Graph of {currentGraph}</p> 
  <Line
  data={chartData} options={chartOptions}>
  </Line>
        </div>
  </div>
  </div>

  <Table striped="columns">
      <thead>
        <tr>
          <th>Time period</th>
          <th>Volume</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Intraday</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Daily</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Weekly</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Monthly</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

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
        
      <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[0]} height="50px" width="50px"/><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {companies[0]}</h5>
        <div class="card-text"> 
          {changeDataCond(0)}
          <Line
  data={chartData} options={chartOptions} height={200} width={200}>
  </Line>
          </div>
        <Button class="buttonSpacing" variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("NKE", 0)}>About</Button>
        <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={() =>stockListMulti('NKE', 500)}>View stock</Button>
        <Button class="buttonSpacing" style={{backgroundColor: 'green', color: 'white', borderColor: 'green', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(0)}>Add to list</Button></li>
        <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[1]} height="50px" width="50px"/>
      <h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>{companies[1]}</h5>
        <div class="card-text">{changeDataCond(1)}
        <Line
  data={chartData} options={chartOptions} height={200} width={200}>
  </Line>
        </div>
        <Button class="buttonSpacing" variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("SBUX", 1)}>About</Button>
        <Button class="buttonSpacing"  style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}} variant="primary" onClick={()=>stockListMulti('SBUX', 500)}>View stock</Button>
        <Button class="buttonSpacing" style={{backgroundColor: 'green', color: 'white', borderColor: 'green', margin: '15px', height: '50px', position: 'absolute', right: '10px'}} onClick={()=>addLike(1)}>Add to list</Button></li>
  <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[2]} height="50px" width="50px"/>
        <h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>{companies[2]}</h5>
        <div class="card-text">{changeDataCond(2)}
        <Line
  data={chartData} options={chartOptions} height={200} width={200}>
  </Line>
        </div>
        <Button class="buttonSpacing" variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("MCD", 2)}>About</Button>
        <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={()=>stockListMulti('MCD', 500)}>View stock</Button>
        <Button class="buttonSpacing" style={{backgroundColor: 'green', color: 'white', borderColor: 'green', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(2)}>Add to list</Button></li>
  <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[3]} height="50px" width="50px"/>
      <h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>{companies[3]}</h5>
        <div class="card-text">{changeDataCond(3)}
        <Line
  data={chartData} options={chartOptions} height={200} width={200}>
  </Line>
        </div>
        <Button class="buttonSpacing" variant="primary" style={{backgroundColor: 'gray', color: 'black', borderColor: 'gray', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("AAPL", 3)}>About</Button>
        <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={()=>stockListMulti('AAPL', 500)}>View stock</Button>
        <Button class="buttonSpacing" style={{backgroundColor: 'green', color: 'white',  borderColor: 'green', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(3)}>Add to list</Button></li>
  <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row'}}><img src={displayArray[4]} height="50px" width="50px"/>
        <h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>{companies[4]}</h5>
        <div class="card-text">{changeDataCond(4)}
        <Line
  data={chartData} options={chartOptions} height={200} width={200}>
  </Line>
        </div>
        <Button class="buttonSpacing" variant="primary" style={{backgroundColor: 'gray', color: 'black',  borderColor: 'gray', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("GOOGL", 4)}>About</Button>
        <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}} variant="primary" onClick={()=>stockListMulti('GOOGL', 500)}>View stock</Button>
        <Button class="buttonSpacing" style={{backgroundColor: 'green', color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '10px'}} onClick={()=>addLike(4)}>Add to list</Button></li>
  
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
        <Button variant="primary">Add to list</Button>
        </Modal.Footer>
      </Modal>
</div>

    </div>
    <h2>Latest in news</h2>
   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[0]} />
      <Card.Body>
        <Card.Title>{newsHeader[0]}</Card.Title>
        <Card.Text>
          {newsBody[0]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(0)}>More information</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[1]} />
      <Card.Body>
        <Card.Title>{newsHeader[1]}</Card.Title>
        <Card.Text>
          {newsBody[1]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(1)}>More information</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[2]} />
      <Card.Body>
        <Card.Title>{newsHeader[2]}</Card.Title>
        <Card.Text>
          {newsBody[2]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(2)} >More information</Button>
      </Card.Body>
    </Card>
   </div>
   
   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[3]} />
      <Card.Body>
        <Card.Title>{newsHeader[3]}</Card.Title>
        <Card.Text>
          {newsBody[3]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(3)} >More information</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[4]} />
      <Card.Body>
        <Card.Title>{newsHeader[4]}</Card.Title>
        <Card.Text>
          {newsBody[4]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(4)} >More information</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[5]} />
      <Card.Body>
        <Card.Title>{newsHeader[5]}</Card.Title>
        <Card.Text>
          {newsBody[5]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(5)} >More information</Button>
      </Card.Body>
    </Card>
   </div>
   <div hidden={isHidden}>
   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[6]} />
      <Card.Body>
        <Card.Title>{newsHeader[6]}</Card.Title>
        <Card.Text>
          {newsBody[6]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(6)}>More information</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[7]} />
      <Card.Body>
        <Card.Title>{newsHeader[7]}</Card.Title>
        <Card.Text>
          {newsBody[7]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(7)}>More information</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[8]} />
      <Card.Body>
        <Card.Title>{newsHeader[8]}</Card.Title>
        <Card.Text>
          {newsBody[8]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(8)} >More information</Button>
      </Card.Body>
    </Card>
   </div>
   
   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[9]} />
      <Card.Body>
        <Card.Title>{newsHeader[9]}</Card.Title>
        <Card.Text>
          {newsBody[9]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(9)} >More information</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[10]} />
      <Card.Body>
        <Card.Title>{newsHeader[10]}</Card.Title>
        <Card.Text>
          {newsBody[10]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(10)} >More information</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={newsImage[11]} />
      <Card.Body>
        <Card.Title>{newsHeader[11]}</Card.Title>
        <Card.Text>
          {newsBody[11]}
        </Card.Text>
        <Button variant="primary" onClick={() => handleShow6(11)} >More information</Button>
      </Card.Body>
    </Card>
    

   </div>
   <Link to="/moreNews" onClick={()=>addMoreNews()}><button>View more news</button></Link>
   </div>
   <button hidden={isHidden2} onClick={() => changeHidden()}>View more news</button>
   <Modal show={show7} onHide={handleClose7}>
        <Modal.Header closeButton>
          <Modal.Title>More about {companies[abSelect]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {descV}
          
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
   <Modal show={show6} onHide={handleClose6}>
        <Modal.Header closeButton>
          <Modal.Title>More about this news</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sentiment score: {newsSentiment[dSelect]}</p>
         
          <p>Source: {newsSource[dSelect]}</p>
          
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => goToSite(dSelect)}>Visit source site</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

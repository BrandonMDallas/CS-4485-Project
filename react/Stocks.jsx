import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './src/App.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {createElement} from 'react';
import Axios from 'axios';
import AiFinance from './aiFinance.jsx'
import ProfilePage from './profilePage.jsx'
import StocksSettings from './stocksSettings.jsx'
import { Line } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table';
//import './App.jsx'
//import OpenAI from "openai";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import chatDo from '../aiChat.js'
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


/*const aiClient=new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
})*/
//chatGPT won't store the conversation or remember what you previously said

  //JSX doesn't recognize the for loop, we need to use the map function instead for iterating
  function StockFunc() {
    const [currencyName, setCurrencyName]=useState(["Currency 1", "Currency 2"])
    const currencyURL="https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=demo"
    const [eRate, seteRate]=useState("")
    async function getRate(){
      await Axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyName[0]}&to_currency=${currencyName[1]}&apikey=32C6KJ3LT0U5QPAN`).then((response)=>{
        console.log("Currency response data ->", response.data)
        seteRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        console.log("eRate ->", eRate)
        
      } )
    }
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
  const [list2, setList2]=useState([])
  const [list3, setList3]=useState([])
  var preList1=list1;
   let index=0;
   let variable1="https://assets.parqet.com/logos/symbol/"+companies[0]+"?format=png"
   let variable2='';
   const[buttonList, setButtonList]=useState([])
   
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
  const[ques1, setQues1]=useState("What's the purpose of stocks?")
  const[res1, setRes1]=useState("")
  const API_KEY="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"
  const chatDo=(event)=>{
    event.preventDefault()
    const options={
      method: "POST",
      
      body: JSON.stringify({
          message: "Why learn about stocks?",
      }),
      headers: {
        "Content-Type": "application/json",  
    }
  }
    axios.post("http://localhost:8000/route1", options).then((res)=>{
      console.log(res.data.choices[0].message.content)
  
      setRes1(res.data.choices[0].message.content)
    }).catch((err)=>{
      console.error(err)
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
    const [dataPoints2, setDataPoints2]=useState([])
    const [dataPoints3, setDataPoints3]=useState([])
    const [dataPoints4, setDataPoints4]=useState([])
    const [dataPoints5, setDataPoints5]=useState([])
    const [dataPoints6, setDataPoints6]=useState([])
  let listChoose=[dataPoints[0], dataPoints2[0], dataPoints3[0], dataPoints4[0], dataPoints5[0], dataPoints6[0]]
  
    const [xPoints, setXPoints]=useState([])
    const [currentGIndex, setGIndex]=useState(0)
  var volumePoints=[];
    async function getStock(value, value2, value3, id){
      let value4="";
      let value5="";
      if(value3==='TIME_SERIES_INTRADAY'){
        value4="interval=30min&"
        value5="30min"
      }else if(value3==="TIME_SERIES_DAILY"){
        value5="Daily"
      }else if(value3==="TIME_SERIES_MONTHLY"){
        value5="Monthly"
      }
     await Axios.get(`https://www.alphavantage.co/query?function=${value3}&symbol=${value}&${value4}outputsize=full&apikey=32C6KJ3LT0U5QPAN`).then((response)=>{
      console.log("Response: ", response)
      console.log("value of comp: ", value);
      let array1=[]
      let array2=[]
      let array3=[]
      let array4=[]
      let array5=[]
      let array6=[]
      for(var key in response.data[`Time Series (${value5})`]){
        array1.push(response.data[`Time Series (${value5})`][key]['1. open'])
        array2.push(key)
        array3.push(response.data[`Time Series (${value5})`][key]['3. low'])
        array4.push(response.data[`Time Series (${value5})`][key]['2. high'])
        array5.push(response.data[`Time Series (${value5})`][key]['4. close'])
        array6.push(response.data[`Time Series (${value5})`][key]['5. volume'])
      }
     if(id===2){
  setDataPoints2(array1)
     }else if(id===3){
  setDataPoints3(array1)
     }else if(id===4){
      setDataPoints4(array1)
  
     }else if(id===5){
      setDataPoints5(array1)
  
     }else if(id===6){
      setDataPoints6(array1)
  
     }else{
      setDataPoints(array1)
      setDataLowPoints(array3)
      setDataHighPoints(array4)
      setDataClosePoints(array5)
      setDataVolumePoints(array6)
      setXPoints(array2)
    
     }
        
      
  
      console.log("Called from id", id)
      console.log("dataPoints: ", dataPoints)
      
     // console.log('dataPoints: ', array)
      //console.log(volumePoints)
     }
     
       
      
     )
    }
    useEffect(()=> {
     
        getStock(companies[1], 5, "TIME_SERIES_INTRADAY", 2);
        getStock(companies[2], 5, "TIME_SERIES_INTRADAY", 3);
        getStock(companies[3], 5, "TIME_SERIES_INTRADAY", 4);
        getStock(companies[4], 5, "TIME_SERIES_INTRADAY", 5);      
        getStock(companies[5], 5, "TIME_SERIES_INTRADAY", 6);
        changeDataCond()
        getER()
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
    /*function LineGenerator (value) {
      const smallPoints=[]
      //getStock(value, 1)
  
      /*setChartData2({
        ...chartData2,
        labels: xSide,
        datasets: [{
          ...chartData2.datasets[0],data: dataPoints,
          borderColor: lineColor
        }]
      });*/
     // return(
        /*<>
        <Line
  data={dataPoints} options={chartOptions} height={200} width={200}>
  </Line>
  </>
      )
    }*/
    
   /* */
   const aiChat = async() => {   //Since this is an async function
    const inputData ={
      method: "POST",
      body: JSON.stringify({
        message: "what's today's stocks like?"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try{
      const respVal=await fetch('http://localhost:8000/route1', inputData)
    const dataBack= await respVal.json()
    console.log('dataBack: ', dataBack)
    }catch{
        console.error(error)
    }
   }
    const [abSelect, setAbSelect]=useState('')
    const compParams = (value, value2) => {
      getComp(value)
      setAbSelect(value2)
      handleShow7()
    }
    const updateData = (nameStock, value, value3, id) => {
     
      //setDynamicData(setArr)
  
      getStock(nameStock, 5, value3, id)
      var xLabel, xSide;
      var lineColor='green'
      const day=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const hour=[xPoints[0], xPoints[1], xPoints[2], xPoints[3], xPoints[4], xPoints[5], xPoints[6], xPoints[7], xPoints[8], xPoints[9], xPoints[10], xPoints[11], xPoints[12], xPoints[13], xPoints[14]];
      //console.log('X version', hour)
      const month=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      //const year=['']
     // const arrayPoints=setArr.map(stri => parseFloat(stri));
      //console.log('Points version', arrayPoints)
      //const newData = chartData2.datasets[0].data.map((item, index) => Math.floor(parseFloat(dataPoints[index])));
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
  
      if((Number(dataPoints[dataPoints.length-1]))<(Number(dataPoints[0]))){
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
      })
         
          
      
    /*  setChartData({
        ...chartData,
        labels: xSide,
        datasets: [{
          ...chartData.datasets[0],data: dataPoints[0],
          borderColor: lineColor
        }]
      });*/
    
  
    };
    const [currentGraph, setCurrentGraph]=useState("")
  
    const stockListMulti = (numberID, value, value2, value3, id) => {
      setCurrentGraph(value)
      setGIndex(numberID)
      updateData(value, 2, value3, id)
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
    const getResultMulti = (value, id) =>{
      
      addLike(value)
      updateData(value, 5, "TIME_SERIES_INTRADAY", id)
      handleClose2()
      scrollFunc(500)
  }
      const fetchInfo=(value) => {
       fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json()).then((json) => {
         const results = json.filter((user)=>{
           return value && user && user.name && user.name.toLowerCase().includes(value/*value entered into the search field */)
         })
         setResultList(results)
         }
       );
     
      }
      let array=[101, 202, 303, 404, 505]
      let activeStocks=[]
      let actStksPrices=[]
      let actStksChanges=[]
      let actStksSymbols=[]
      const [as1, setAs1]=useState("")
      const [asC1, setAsC1]=useState("")
      const [asP1, setAsP1]=useState("")
      const [as2, setAs2]=useState("")
      const [asC2, setAsC2]=useState("")
      const [asP2, setAsP2]=useState("")
      const [as3, setAs3]=useState("")
      const [asC3, setAsC3]=useState("")
      const [asP3, setAsP3]=useState("")
      const [as4, setAs4]=useState("")
      const [asC4, setAsC4]=useState("")
      const [asP4, setAsP4]=useState("")
      const [as5, setAs5]=useState("")
      const [asS5, setasS5]=useState("")
      const [asC5, setAsC5]=useState("")
      const [asP5, setAsP5]=useState("")
      const [diffArray, setDiffArray]=useState([dataPoints2[0]-dataPoints[1], dataPoints3[0]-dataPoints[1], dataPoints4[0]-dataPoints4[1], dataPoints5[0]-dataPoints[1], dataPoints6[0]-dataPoints6[1]])
      async function changeDataCond (){
        await Axios.get(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=xN4lrLuDYQNI6EV4mSbwXUZY7xek4Fj7`).then((response)=>{
          const parsedData = JSON.parse(JSON.stringify(response));
          console.log("Most active stocks: ", parsedData)
          console.log("Heres an active NAME: ", parsedData.data[0].name)
          for (let i = 0; i < 9; i++) {
            activeStocks.push(parsedData.data[i].name);
            actStksChanges.push(parsedData.data[i].change)
            actStksPrices.push(parsedData.data[i].price)
            actStksSymbols.push(parsedData.data[i].symbol)
          }
          console.log("ACTIVE STOCKS LIST: ", activeStocks)
          setAs1(activeStocks[0])
          setAsC1(actStksChanges[0])
          setAsP1(actStksPrices[0])
          setAs2(activeStocks[1])
          setAsC2(actStksChanges[1])
          setAsP2(actStksPrices[1])
          setAs3(activeStocks[2])
          setAsC3(actStksChanges[2])
          setAsP3(actStksPrices[2])
          setAs4(activeStocks[3])
          setAsC4(actStksChanges[3])
          setAsP4(actStksPrices[3])
          setAs5(activeStocks[8])
          setAsC5(actStksChanges[8])
          setAsP5(actStksPrices[8])
          setasS5(actStksSymbols[8])
        }
      )
       }
       const addLike = (value) => {
        //Issues here
        let tempArray=list1;
      tempArray.push(value)
      setList1(tempArray)
      setListCount((listCount)=>listCount+1)
      //setList1(tempArray)
      }
       const displayArray = ["https://assets.parqet.com/logos/symbol/"+actStksSymbols[0]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[1]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[2]+"?format=png",
       "https://assets.parqet.com/logos/symbol/"+actStksSymbols[8]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[4]+"?format=png", 
       "https://assets.parqet.com/logos/symbol/"+actStksSymbols[5]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[6]+"?format=png", 
     "https://assets.parqet.com/logos/symbol/"+actStksSymbols[8]+"?format=png"];
       const handleChange = (value) => {
           setInputValue(value)
          //fetchInfo(value)
          const filteredElements = activeStocks.filter((item) =>{
            return item.toLowerCase().includes(value)
          });
          console.log('SEARCH ELEMENTS: ', filteredElements)
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
    const [lER, setlER]=useState("")
    const [rER, setrER]=useState("")
    async function getER(){
      await Axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=NKE&apikey=demo").then((response)=> {
        try{
          const parsedData = JSON.parse(JSON.stringify(response));
          console.log("Exchange rates", parsedData)
         
          setlER(parsedData["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
          console.log(lER)
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
      <Link to="/"><div style={{ position: 'fixed', left: '10%', backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
      <img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/>
      </div></Link> 
      <Link to="/stocksSetting"><div style={{ position: 'fixed', right: '2.5%', backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
       <img style={{backgroundColor: 'white'}} src="https://w7.pngwing.com/pngs/953/757/png-transparent-setting-3d-icon.png" width="50px" height="50px"/>
      <br />Settings
      </div></Link>
      <Link to="/profilePage"><div style={{ position: 'fixed', right: '7.5%', backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', margin: '10px'}}>
      
          <img  src="https://cdn-icons-png.flaticon.com/512/9815/9815472.png" width="50px" height="50px"/>
      <br></br>Profile
        </div></Link>
      
      </div>
      <h1 className="modern-title mb-0" style={{fontSize: '60px'}}>StocksHub</h1>
      </div>
      <p class="lead">Today's date and time: {displayDate} {currTime.toLocaleTimeString()}</p>
      <div style={{display: 'flex', gap: '10px'}}>
  
      
      
        <div style={{width: '100%'}}>
        <div class="yourSection" style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
          <h2>Stock data</h2>
          <button variant="primary" onClick={handleShow} style={{ display: 'block', margin:'auto', float: 'right'}}>
          Edit list below
        </button>
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
        <button type="button" style={{ display: 'block', margin:'auto', float: 'left'}} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" onClick={handleShow4}>
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
  <p class="lead" style={{position: 'absolute', left: '32.5%', right: '50%'}}>Your stocks</p><br /><br />
  <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  {
                list1.map((item, index) => {
                  return <div key={index} style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.6)', borderRadius: '12px', backgroundColor: 'white', margin: '10px' }}>
                  
                  <label>
                    <p>{list1[index]}</p>
                    <p>Symbol: </p>
                    <p>Price value: </p>
                    <button type="button" class="btn btn-primary" onClick={()=>stockListMulti(index, list1[index], 850, "TIME_SERIES_INTRADAY", 0)}>View stock</button>
                  
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
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}} class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={()=>updateData(companies[currentGIndex], 1, "TIME_SERIES_INTRADAY", 1)}>View by recent hours</a>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(companies[currentGIndex], 2, "TIME_SERIES_DAILY", 1)}>View by recent week</a>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(companies[currentGIndex], 3, "TIME_SERIES_MONTHLY", 1)}>View by recent dates</a>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '2px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(companies[currentGIndex], 4, "TIME_SERIES_ADJUSTED", 1)}>View all data</a>
  
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
  <p class="lead">Extra data about this specific stock</p>
    <Table striped="columns">
        <thead>
          <tr>
            <th>Specific date/time</th>
            <th>High</th>
            <th>Volume</th>
            <th>Low</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{xPoints[0]}</td>
            <td>{dataHighPoints[0]}</td>
            <td>{dataVolumePoints[0]}</td>
            <td>{dataLowPoints[0]}</td>
            <td>{dataClosePoints[0]}</td>
          </tr>
          <tr>
            <td>{xPoints[100]}</td>
            <td>{dataHighPoints[100]}</td>
            <td>{dataVolumePoints[100]}</td>
            <td>{dataLowPoints[100]}</td>
            <td>{dataClosePoints[100]}</td>
          </tr>
          <tr>
            <td>{xPoints[400]}</td>
            <td>{dataHighPoints[400]}</td>
            <td>{dataVolumePoints[400]}</td>
            <td>{dataLowPoints[400]}</td>
            <td>{dataClosePoints[400]}</td>
          </tr>
          <tr>
            <td>{xPoints[xPoints.length-1]}</td>
            <td>{dataHighPoints[xPoints.length-1]}</td>
            <td>{dataVolumePoints[xPoints.length-1]}</td>
            <td>{dataLowPoints[xPoints.length-1]}</td>
            <td>{dataClosePoints[xPoints.length-1]}</td>
          </tr>
        </tbody>
      </Table>
  
  </form>
  </div>
  <br></br>
  <div>
    
      <div class="moreSection" style={{width: '133%'}}>
          
          <br></br>
          <div class="card">
          <h2>View more stocks</h2>
    <div class="card-body">
      Here's a list of some of the currently most active stocks 
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
                  return <div className="searchResult" key={index} onClick={() => getResultMulti(result, 0)}>{result}</div>
                }
              )}
          </div>
          </Modal.Body>
          
        
          <Modal.Footer>
          
          </Modal.Footer>
        </Modal>
        <ul class="list-group" >
          
        <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}><img src={displayArray[0]} height="50px" width="50px"/><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as1}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP1}
          <br />
          Change: {asC1}
        </p>
  
        
        
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("NKE", 0)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(1, 'NKE', 500, "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(as1, 0)}>Add to list</Button>
          <br>
          </br></li>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}><img src={displayArray[1]} height="50px" width="50px"/><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as2}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP2}
          <br />
          Change: {asC2}
        </p>
  
        
        
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("NKE", 0)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(1, 'NKE', 500, "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(as2, 1)}>Add to list</Button>
          <br>
          </br></li>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}><img src={displayArray[2]} height="50px" width="50px"/><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as3}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP3}
          <br />
          Change: {asC3}
        </p>
  
        
        
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("NKE", 0)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(1, 'NKE', 500, "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(as3, 2)}>Add to list</Button>
          <br>
          </br></li>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}><img src={displayArray[3]} height="50px" width="50px"/><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as4}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP4}
          <br />
          Change: {asC4}
        </p>
  
        
        
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("NKE", 0)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(1, 'NKE', 500, "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(as4, 3)}>Add to list</Button>
          <br>
          </br></li>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}><img src={displayArray[4]} height="50px" width="50px"/><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as5}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP5}
          <br />
          Change: {asC5}
        </p>
  
        
        
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '290px'}} onClick={() => compParams("NKE", 0)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(1, 'NKE', 500, "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '10px'}}  onClick={()=>addLike(as5, 4)}>Add to list</Button>
          <br>
          </br></li>
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
     
      </div>
      </div>
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
      <button onClick={(e)=>chatDo(e)}>Ask</button>
      <p>Response: {res1}</p>
            </form>
         
         <div class="modal-dialog modal-dialog-scrollable">
         <chatDo />
  </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <Card style={{width: '100%', height: '30%', flexDirection: 'right'}}>
          <h3 style={{color: 'blue'}}>Get exchange rates here</h3>
          <div style={{display: 'flex', gap: '10px'}}>
          <Dropdown>
        <Dropdown.Toggle style={{backgroundColor: 'white', color: 'black', borderColor: 'black'}} variant="success" id="dropdown-basic">
         {currencyName[0]}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>setCurrencyName(["USD", currencyName[1]])}>American Dollar</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName(["GBP", currencyName[1]])}>British Pound</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName(["EUR", currencyName[1]])}>Euro</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName(["CAD", currencyName[1]])}>Canadian Dollar</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName(["JPY", currencyName[1]])}>Japanese Yen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  <p> to </p>
  <Dropdown>
        <Dropdown.Toggle style={{backgroundColor: 'white', color: 'black', borderColor: 'black'}}  variant="success" id="dropdown-basic">
         {currencyName[1]}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>setCurrencyName([currencyName[0], "USD"])}>American Dollar</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName([currencyName[0], "GBP"])}>British Pound</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName([currencyName[0], "EUR"])}>Euro</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName([currencyName[0], "CAD"])}>Canadian Dollar</Dropdown.Item>
          <Dropdown.Item onClick={()=>setCurrencyName([currencyName[0], "JPY"])}>Japanese Yen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
  </div>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <button onClick={()=>getRate()}>Calculate rate</button>
  <br></br>
  <p>Result: {eRate}</p>
      </Card>
      </div>
      </div>
      <h2>Latest in news</h2>
      <div style={{display: 'flex', gap: '13px'}}>
      <div>
        <h3 style={{color: 'blue'}}>Videos related to {currentGraph}</h3>
        <div>
        
        <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
        
        
          
       
        </div>
        
        
      </div>
      <div>
      <h3 style={{color: 'blue'}}>Articles</h3>
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
      
      
  
     </div>
     <Link to="/moreNews" onClick={()=>addMoreNews()}><button>View more news</button></Link>
     </div>
     <button hidden={isHidden2} onClick={() => changeHidden()}>View more news</button>
     </div>
     
     </div>
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
  /**
   * <div>
      {
        return(
          <>
        {(() => {
          for(let count=0; count<30; count++){
            return(
              <>
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
        </>
            )
          }
        )
        })}
        </>
      }
      </div>
   */
  /**
   * plugins: {
        title: {
           display: true,
           text: companies[0],
           color: 'navy',
           position: 'top',
           align: 'center',
           font: {
              weight: 'bold'
           },
           padding: 8,
           fullSize: true,
        }
     },
   */
  /**
   * <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160, 200, 10, 10], 3)}>3 days</a>
        <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160, 200, 10, 10], 4)}>1 week</a>
        <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160, 200, 10, 10], 5)}>1 month</a>
        <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160, 200, 10, 10], 5)}>3 months</a>
        <a style={{backgroundColor: 'lightgray', color: 'black', borderColor: 'black'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData([100, 200, 300, 160, 200, 10, 10], 5)}>12 months</a>
   */
  //For automatic scrolling: window.scrollTo(500, 0);
  export default StockFunc
  
  /**
   * <br></br>
            <p>Source domain: </p>
            {() => {if(!newsSourceDomain[dSelect]){
              return(
                <p>None available</p>
              )
            }}}
   */
  
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
  
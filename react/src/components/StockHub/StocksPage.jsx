import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './stocksStyle.css'
import 'https://cdn.jsdelivr.net/npm/chart.js'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Settings from '../Dashboard/SettingsTab.jsx'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../Dashboard/Dashboard.jsx'
import {createElement} from 'react';
import Axios from 'axios';
//import './moreStocksNews.jsx'
import './AIStockRecommendationTool.jsx'
//import AiFinance from './aiFinance.jsx'
//import ProfilePage from './profilePage.jsx'
//import StocksSettings from './stocksSettings.jsx'
import { Line } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table';
//import './App.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './moreStocksNews.jsx'
import { NavLink } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CgEnter } from 'react-icons/cg';
import AIStockRecommendationTool from './AIStockRecommendationTool.jsx';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
)
const API_KEY="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"

/*const aiClient=new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
})*/
//chatGPT won't store the conversation or remember what you previously said

  //JSX doesn't recognize the for loop, we need to use the map function instead for iterating
  function StockFunc() {
    const [disabledV, setDisabledV]=useState([false, false, false, false, false, false, false, false, false, false])
    const [as1, setAs1]=useState("")
      const [asC1, setAsC1]=useState("")
      const [asP1, setAsP1]=useState("")
      const [asS1, setAsS1]=useState("")
      const [as2, setAs2]=useState("")
      const [asC2, setAsC2]=useState("")
      const [asP2, setAsP2]=useState("")
      const [asS2, setAsS2]=useState("")
      const [as3, setAs3]=useState("")
      const [asC3, setAsC3]=useState("")
      const [asP3, setAsP3]=useState("")
      const [asS3, setAsS3]=useState("")
      const [as4, setAs4]=useState("")
      const [asC4, setAsC4]=useState("")
      const [asP4, setAsP4]=useState("")
      const [asS4, setAsS4]=useState("")
      const [as5, setAs5]=useState("")
      const [asS5, setasS5]=useState("")
      const [asC5, setAsC5]=useState("")
      const [asP5, setAsP5]=useState("")
      const [asS6, setAsS6]=useState("")
      const [as6, setAs6]=useState("")
      const [asC6, setAsC6]=useState("")
      const [asP6, setAsP6]=useState("")
      const [as7, setAs7]=useState("")
      const [asC7, setAsC7]=useState("")
      const [asP7, setAsP7]=useState("")
      const [asS7, setAsS7]=useState("")
      const [as8, setAs8]=useState("")
      const [asC8, setAsC8]=useState("")
      const [asP8, setAsP8]=useState("")
      const [asS8, setAsS8]=useState("")
      const [as9, setAs9]=useState("")
      const [asC9, setAsC9]=useState("")
      const [asP9, setAsP9]=useState("")
      const [asS9, setAsS9]=useState("")
      const [as10, setAs10]=useState("")
      const [asC10, setAsC10]=useState("")
      const [asP10, setAsP10]=useState("")
      const [asS10, setAsS10]=useState("")
      const companies=[as1, as2, as3, as4, as5, as6, as7, as8, as9, as10];
    const symbols=[asS1, asS2, asS3, asS4, asS5, asS6, asS7, asS8, asS9, asS10]
    const [currencyName, setCurrencyName]=useState(["Currency 1", "Currency 2"])
    const [videoId, setVideoId]=useState("")
    const [videoId2, setVideoId2]=useState("")
    const [videoId3, setVideoId3]=useState("")
    const [videoId4, setVideoId4]=useState("")
    const [videoId5, setVideoId5]=useState("")
    const currencyURL="https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=demo"
    const [eRate, seteRate]=useState("")
    async function getRate(){
      await Axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyName[0]}&to_currency=${currencyName[1]}&apikey=7RZVY7KZE49Y3X1S`).then((response)=>{
        console.log("Currency response data ->", response.data)
        seteRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        console.log("eRate ->", eRate)
        
      } )
    }
    let videoIds=[]
    async function getVideos(){
      await Axios.get(`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyCZh-67g2M5u0LDKyXYHCTweVp1mjZDisU&part=snippet&q=stocks news`).then((response)=>{
        const parsedData = JSON.parse(JSON.stringify(response));
        console.log('From YOUTUBE: ', parsedData)
        for (let i = 0; i < 5; i++) {
            videoIds.push(parsedData.data.items[i].id.videoId)
        }
  console.log("VIDEO IDS ARRAY: ", videoIds)
      setVideoId(videoIds[0])
      setVideoId2(videoIds[1])
      setVideoId3(videoIds[2])
      setVideoId4(videoIds[3])
      setVideoId5(videoIds[4])
      } )
    }
    let relatedVideoIds=[]
    const [relatedVideoId, setRelatedVideoId]=useState("")
    const [relatedVideoId2, setRelatedVideoId2]=useState("")
    const [relatedVideoId3, setRelatedVideoId3]=useState("")
    const [relatedVideoId4, setRelatedVideoId4]=useState("")
    const [relatedVideoId5, setRelatedVideoId5]=useState("")
    async function getRelatedVideos(value){
      await Axios.get(`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyCZh-67g2M5u0LDKyXYHCTweVp1mjZDisU&part=snippet&q=stocks news ${value}`).then((response)=>{
        const parsedData = JSON.parse(JSON.stringify(response));
        console.log('From YOUTUBE RELATED: ', parsedData)
        for (let i = 0; i < 5; i++) {
            relatedVideoIds.push(parsedData.data.items[i].id.videoId)
        }
  console.log("VIDEO IDS ARRAY: ", relatedVideoIds)
  setRelatedVideoId(relatedVideoIds[0])
  setRelatedVideoId2(relatedVideoIds[1])
  setRelatedVideoId3(relatedVideoIds[2])
  setRelatedVideoId4(relatedVideoIds[3])
  setRelatedVideoId5(relatedVideoIds[4])
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
  const company='';
  const ctx = document.getElementById("myChart");
  var theList=['company1', 'company2', 'company3']
  var timeIntervals=['minutes', 'hours', 'days', 'months', 'years']
  
  const [list1, setList1] = useState([]);
  const [list2, setList2]=useState([])
  const [list3, setList3]=useState([])
  const [list4, setList4]=useState([])
  const [list5, setList5]=useState([])
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
    const locationV = document.getElementById(value);
    locationV.scrollIntoView({ behavior: 'smooth' }); 
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
  const [messageArray, setMessageArray]=useState([
    {
      message: ""
    }
  ])
  const[ques1, setQues1]=useState("What's the purpose of stocks?")
  const[res1, setRes1]=useState("Response will be displayed here.")
  /*const chatConfig={
    role: "system",
    content: "Respond in the form of a paragraph."
  }
  const apiRB={
    "model": "gpt-3.5-turbo",
    "messages": messageV
  }*/
  const [messageValue, setMessageValue]=useState("")
  async function chatDo(event){
    event.preventDefault()
    const options={
      method: "POST",
      headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",  
      },
      body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: messageValue}],
          max_tokens: 100,  //every text prompt is tokenized
          
      })
  }
    await fetch("https://api.openai.com/v1/chat/completions", options).then((res)=>{
      return res.json()
    }).then((res)=>{
      console.log("AI SAYS:", res)
      setRes1(res.choices[0].message.content)
    })
    /*const options={
      method: "POST",
      
      body: JSON.stringify({
          message: messageV,
      }),
      headers: {
        "Content-Type": "application/json",  
    }
  }
    axios.post("http://localhost:8000/route1", {messageV}).then((res)=>{
      console.log(res.data.choices[0].message.content)
  
      setRes1(res.data)
    }).catch((err)=>{
      console.error(err)
    })*/
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
     await Axios.get(`https://www.alphavantage.co/query?function=${value3}&symbol=${value}&${value4}outputsize=full&apikey=7RZVY7KZE49Y3X1S`).then((response)=>{
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
      getStock('IBM', 5, "TIME_SERIES_INTRADAY", 1)
        getStock(companies[1], 5, "TIME_SERIES_INTRADAY", 2);
        getStock(companies[2], 5, "TIME_SERIES_INTRADAY", 3);
        getStock(companies[3], 5, "TIME_SERIES_INTRADAY", 4);
        getStock(companies[4], 5, "TIME_SERIES_INTRADAY", 5);      
        getStock(companies[5], 5, "TIME_SERIES_INTRADAY", 6);
        changeDataCond()
        getER()
        //getSearchResult("Microsoft")
        getVideos();
        getRelatedVideos();
        getNews();
    }, [])
    
   
    const [descV, setDescV]=useState("")
    async function getComp(value){
      await Axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${value}&apikey=7RZVY7KZE49Y3X1S`).then((response)=>{
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
      
      if(value2===0){
        setAbSelect(as1)
      }else if(value2===1){
        setAbSelect(as2)
      }if(value2===2){
        setAbSelect(as3)
      }else if(value2===3){
        setAbSelect(as4)
      }if(value2===4){
        setAbSelect(as5)
      }else if(value2===5){
        setAbSelect(as6)
      }if(value2===6){
        setAbSelect(as7)
      }else if(value2===7){
        setAbSelect(as8)
      }if(value2===8){
        setAbSelect(as9)
      }else if(value2===9){
        setAbSelect(as10)
      }
      handleShow7()
    }
    const [userStocks, setUserStocks]=useState([])
    const updateData = (nameStock, value, value3, id) => {
       
      getStock(nameStock, 5, value3, id)
      var xLabel, xSide;
      var lineColor='green'
      const day=[xPoints[0], xPoints[1], xPoints[2], xPoints[3], xPoints[4], xPoints[5], xPoints[6]]
      const hour=[xPoints[0], xPoints[1], xPoints[2], xPoints[3], xPoints[4], xPoints[5], xPoints[6], xPoints[7], xPoints[8], xPoints[9], xPoints[10], xPoints[11], xPoints[12], xPoints[13], xPoints[14]];
      const month=[xPoints[0], xPoints[1], xPoints[2], xPoints[3], xPoints[4], xPoints[5], xPoints[6], xPoints[7], xPoints[8], xPoints[9], xPoints[10], xPoints[11]]
      if(value===1){

        xSide=hour.slice().reverse()
        xLabel='Specific time'
      }else if(value===2){
        xSide=day.slice().reverse()
        xLabel='Specific date'
      }else if(value===3){
        xSide=month.slice().reverse()
        xLabel='Specific date'
      }else if(value===4){
        xSide=[xPoints[650], xPoints[600], xPoints[500], xPoints[400], xPoints[300], xPoints[200], xPoints[100], xPoints[0]]
        xLabel='Specific date'
      }
  
      if((Number(dataPoints[dataPoints.length-1]))<(Number(dataPoints[0]))){
        lineColor='green'
      }
      const revArray=dataPoints.slice().reverse();
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
    };
    const [currentGraph, setCurrentGraph]=useState("IBM")
    const [currentSymbol, setCurrentSymbol]=useState("IBM")
    
    const stockListMulti = (numberID, value, value2, value3, id) => {
      setCurrentGraph(value)
      getRelatedVideos(value)
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
      }
      const handleClose5=() => setShow5(false)
      const addbutton = (index) => {
        const newButton =(<button style={{borderRadius: '10px'}}>{companies[index]}</button>);
        setButtons([...buttons, newButton]);
    };
  
    const getResultMulti = (value, id) =>{
     
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
      
      const [diffArray, setDiffArray]=useState([dataPoints2[0]-dataPoints[1], dataPoints3[0]-dataPoints[1], dataPoints4[0]-dataPoints4[1], dataPoints5[0]-dataPoints[1], dataPoints6[0]-dataPoints6[1]])
      let tempArray10=[];
  
      async function changeDataCond (){
        await Axios.get(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=xN4lrLuDYQNI6EV4mSbwXUZY7xek4Fj7`).then((response)=>{
          const parsedData = JSON.parse(JSON.stringify(response));
          console.log("Most active stocks: ", parsedData)
          console.log("Heres an active NAME: ", parsedData.data[0].name)
          for (let i = 0; i < 20; i++) {
            activeStocks.push(parsedData.data[i].name);
            actStksChanges.push(parsedData.data[i].change)
            actStksPrices.push(parsedData.data[i].price)
            actStksSymbols.push(parsedData.data[i].symbol)
            
          }
          console.log("ACTIVE STOCKS LIST: ", activeStocks)
          setAs1(activeStocks[0])
          setAsC1(actStksChanges[0])
          setAsP1(actStksPrices[0])
          setAsS1(actStksSymbols[0])
          setAs2(activeStocks[1])
          setAsC2(actStksChanges[1])
          setAsP2(actStksPrices[1])
          setAsS2(actStksSymbols[1])
          setAs3(activeStocks[2])
          setAsC3(actStksChanges[2])
          setAsP3(actStksPrices[2])
          setAsS3(actStksSymbols[2])
  
          setAs4(activeStocks[3])
          setAsC4(actStksChanges[3])
          setAsP4(actStksPrices[3])
          setAsS4(actStksSymbols[3])
  
          setAs5(activeStocks[4])
          setAsC5(actStksChanges[4])
          setAsP5(actStksPrices[4])
          setasS5(actStksSymbols[4])
          setAs6(activeStocks[5])
          setAsC6(actStksChanges[5])
          setAsP6(actStksPrices[5])
          setAsS6(actStksSymbols[5])
  
          setAs7(activeStocks[6])
          setAsC7(actStksChanges[6])
          setAsP7(actStksPrices[6])
          setAsS7(actStksSymbols[6])
  
          setAs8(activeStocks[7])
          setAsC8(actStksChanges[7])
          setAsP8(actStksPrices[7])
          setAsS8(actStksSymbols[7])
  
          setAs9(activeStocks[8])
          setAsC9(actStksChanges[8])
          setAsP9(actStksPrices[8])
          setAsS9(actStksSymbols[8])
  
          setAs10(activeStocks[9])
          setAsC10(actStksChanges[9])
          setAsP10(actStksPrices[9])
          setAsS10(actStksSymbols[9])
  
          tempArray10=activeStocks;
        }
      )
       }
       const [topCount, setTopCount]=useState(0)
       const addLike = (value, value2, value3, value4) => {
        let tempArray=list1;
      tempArray.push(value)
      setList1(tempArray)
      tempArray=list2;
      tempArray.push(value2)
      setList2(tempArray)
      tempArray=list3;
      tempArray.push(value3)
      setList3(tempArray)
      setListCount((listCount)=>listCount+1)
      tempArray=list4;
      tempArray.push(value4)
      setList4(tempArray)
      setTopCount(topCount+1)
      }
       const displayArray = ["https://assets.parqet.com/logos/symbol/"+actStksSymbols[0]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[1]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[2]+"?format=png",
       "https://assets.parqet.com/logos/symbol/"+actStksSymbols[3]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[4]+"?format=png", 
       "https://assets.parqet.com/logos/symbol/"+actStksSymbols[5]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[6]+"?format=png", 
     "https://assets.parqet.com/logos/symbol/"+actStksSymbols[7]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[8]+"?format=png", "https://assets.parqet.com/logos/symbol/"+actStksSymbols[9]+"?format=png"];
       const handleChange = (event) => {
          
       
           setInputValue(event.target.value)
       }
       let srArrayName=[]
       let srArraySymbol=[]
       const [srS1, setSrS1]=useState("-")
       const [srS2, setSrS2]=useState("-")
       const [srS3, setSrS3]=useState("-")
       const [srS4, setSrS4]=useState("-")
       const [srS5, setSrS5]=useState("-")
       const [srS6, setSrS6]=useState("-")
       const [srSS1, setSrSS1]=useState("-")
       const [srSS2, setSrSS2]=useState("-")
       const [srSS3, setSrSS3]=useState("-")
       const [srSS4, setSrSS4]=useState("-")
       const [srSS5, setSrSS5]=useState("-")
       const [srSS6, setSrSS6]=useState("-")
       let srarrayA=[srS1, srS2, srS3, srS4, srS5, srS6]
       let srarrayA2=[srSS1, srSS2, srSS3, srSS4, srSS5, srSS6]
  
       async function getSR(event){
        event.preventDefault();
        setSearchHidden(false)
          await Axios.get(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&apikey=xN4lrLuDYQNI6EV4mSbwXUZY7xek4Fj7`).then((response)=>{
            const parsedData = JSON.parse(JSON.stringify(response));
           for (let i = 0; i < parsedData.data.length; i++) {
             srArrayName.push(parsedData.data[i].name)
               srArraySymbol.push(parsedData.data[i].symbol)
          }
            console.log("PARSED DATA: ", parsedData)
        console.log("SEARCH RESULT 1: ", srArrayName)
          console.log("SEARCH RESULT 2: ", srArraySymbol)
          setSrS1(srArrayName[0])
          setSrS2(srArrayName[1])
          setSrS3(srArrayName[2])
          setSrS4(srArrayName[3])
          setSrS5(srArrayName[4])
          setSrS6(srArrayName[5])
  
          setSrSS1(srArraySymbol[0])
          setSrSS2(srArraySymbol[1])
          setSrSS3(srArraySymbol[2])
          setSrSS4(srArraySymbol[3])
          setSrSS5(srArraySymbol[4])
          setSrSS6(srArraySymbol[5])
          }
        )
         
       }
       const handleShow2 = () => setShow2(true);
   
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };
      const [isHidden, setHidden]=useState(true);
      const [isHidden2, setHidden2]=useState(false);
      const [isHidden3, setHidden3]=useState(false);
      const [searchHidden, setSearchHidden]=useState(true);
      const changeHidden = () =>{
        handleClick()
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
      await Axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=NKE&apikey=7RZVY7KZE49Y3X1S").then((response)=> {
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
  
          for (let i = 0; i < 20; i++) {
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
        }catch(error){
          console.error('Error with API:', error);
        }
      })
    }
      
      const goToSite = (value) => {
        window.open(newsSourceDomain[value]);
      }
  
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
          return(
      <div style={{padding: '20px'}}>
      <br />
     <div style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px'}}>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
      
      
      
      
      </div>
      <div style={{display: 'flex', gap: '400px'}}>
      <div style={{display: 'flex'}}>
      <NavLink to="/dashboard"><div style={{ backgroundColor: 'white',
     padding: '10px', margin: '20px'}}>
      <img src="https://cdn-icons-png.flaticon.com/512/81/81037.png" width="20px" height="20px"/>
      </div></NavLink>
      <div style={{display: 'flex'}}>
   
      <h1  className="sports-hub-title fs-4 mb-0 me-4" style={{fontSize: '150px', textAlign: 'left'}}>StocksHub</h1>
    
      <div style={{position: 'absolute', right: '1%'}}>
      <Link to="/settingsPage" style={{position: 'relative', right: '10px'}}><button className="btn btn-outline-primary me-2 d-flex align-items-center">
      Settings
      </button></Link>
      </div>
      
      </div>
  </div>
      </div>
      
  
      </div>
      <br></br>
        <br></br>
      <div class="card" style={{width:'fit-content'}}>
  <div class="card-body">
  <p class="lead">Today's date and time: {displayDate} {currTime.toLocaleTimeString()}</p>
    The US stock market is usually open on weekdays from 8:30 am to 3 pm central time. 
  </div>
</div>
      <br></br>
      <div style={{display: 'flex', gap: '20px'}}>
      
      <div class="moreSection" id="listSection" style={{width: '65%'}}>
          
          <br></br>
          <div style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
          <h6 class="h6" style={{ fontWeight: 'bold', fontSize: '30px' }}>Top 10 currently active stocks</h6>
    <div class="card-body">
      <p class="lead">
      Here is a list of some of the most active stocks 
  
      </p>
    </div>
    <br />
    
    <button className="btn btn-outline-primary me-2 d-flex align-items-center" style={{borderRadius: '10px'}} onClick={handleShow2}>
          Search for additional stocks
        </button>
        <br />
  <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Find a stock you want</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={createRL}>
          <label>Search for a company
            <div style={{display: 'flex', gap: '10px'}}>
          <input 
          placeholder='Type here...'
        type="text"
        class="form-control"
        value={inputValue}
        onChange={handleChange}
      /> 
      <button style={{borderRadius: '10px'}} className="btn btn-outline-primary me-2 d-flex align-items-center" onClick={(e)=>getSR(e)}>    Search
      </button>
      </div>
          </label>
          
          </form>
          <div hidden={searchHidden} class="results-list" >
              {
                <ul class="list-group" style={{borderColor: 'black'}}>
                  <li class="list-group item"><div style={{display: 'flex', gap: '10px'}}>{srarrayA[0]}{srarrayA2[0]} <Button onClick={()=>addLike(srS1, '-', '-', srSS1)}>Save stock</Button></div></li>
                  <br></br>
                  <li class="list-group item"><div style={{display: 'flex', gap: '10px'}}>{srarrayA[1]}{srarrayA2[1]}<Button onClick={()=>addLike(srS2, '-', '-', srSS2)}>Save stock</Button></div></li>
                  <br></br>
                  <li class="list-group item"><div style={{display: 'flex', gap: '10px'}}>{srarrayA[2]}{srarrayA2[2]}<Button onClick={()=>addLike(srS3, '-', '-', srSS3)}>Save stock</Button></div></li>
                  <br></br>
                  <li class="list-group item"><div style={{display: 'flex', gap: '10px'}}>{srarrayA[3]}{srarrayA2[3]}<Button onClick={()=>addLike(srS4, '-', '-', srSS4)}>Save stock</Button></div></li>
                  <br></br>
                  <li class="list-group item" ><div style={{display: 'flex', gap: '10px'}}>{srarrayA[4]}{srarrayA2[4]}<Button onClick={()=>addLike(srS5, '-', '-', srSS5)}>Save stock</Button></div></li>
                  <br></br>
                  <li class="list-group item"><div style={{display: 'flex', gap: '10px'}}>{srarrayA[5]}{srarrayA2[5]}<Button onClick={()=>addLike(srS6, '-', '-', srSS6)}>Save stock</Button></div></li>
                </ul>
                }
          </div>
          </Modal.Body>
          
        
          <Modal.Footer>
          
          </Modal.Footer>
        </Modal>
        <br />
        <ul class="list-group" >
          
        <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
        <div style={{display: 'block', textAlign: 'left'}}>
  
          <h4 style={{color: 'blue'}}>{asS1}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}> {as1} </h5>
        
        <div class="card-text">
        <p>
          Price: {asP1}
          <br />
          Change: {asC1}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', marginLeft: '15px', height: '50px', position: 'absolute', top: '17px', right: '311px'}} onClick={() => compParams(asS1, 0)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', top: '2px', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(0, asS1, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{color: 'white', margin: '15px', height: '50px', position: 'absolute', top: '2px', right: '2px'}}  onClick={()=>addLike(as1, asP1, asC1, asS1)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
            <div style={{display: 'block', textAlign: 'left'}}>
            <h4 style={{color: 'blue'}}>{asS2}</h4>
            <h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>{as2}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP2}
          <br />
          Change: {asC2}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS2, 1)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', top: '2px', right: '150px'}}  variant="primary" onClick={() =>stockListMulti(1, asS2, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as2, asP2, asC2, asS2)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
          <div style={{display: 'block', textAlign: 'left'}}>
  
            <h4 style={{color: 'blue'}}>{asS3}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as3}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP3}
          <br />
          Change: {asC3}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS3, 2)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(2, asS3, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', top: '2px', right: '2px'}}  onClick={()=>addLike(as3, asP3, asC3, asS3)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
          <div style={{display: 'block', textAlign: 'left'}}>
  
            <h4 style={{color: 'blue'}}>{asS4}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as4}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP4}
          <br />
          Change: {asC4}
        </p>
  
        
        
        </div>
        </div>
  
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS4, 3)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(3, asS4, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as4, asP4, asC4, asS4)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
          <div style={{display: 'block', textAlign: 'left'}}>
  
            <h4 style={{color: 'blue'}}>{asS5}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as5}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP5}
          <br />
          Change: {asC5}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS5, 4)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(4, asS5, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as5, asP5, asC5, asS5)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
            
          <div style={{display: 'block', textAlign: 'left'}}>
  
            <h4 style={{color: 'blue'}}>{asS6}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as6}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP6}
          <br />
          Change: {asC6}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS6, 5)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(5, asS6, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as6, asP6, asC6, asS6)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
          <div style={{display: 'block', textAlign: 'left'}}>
  
            
            <h4 style={{color: 'blue'}}>{asS7}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as7}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP7}
          <br />
          Change: {asC7}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', top: '2px', right: '296px'}} onClick={() => compParams(asS7, 6)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(6, asS7, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as7, asP7, asC7, asS7)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>
          <div style={{display: 'block', textAlign: 'left'}}>
  
            
            <h4 style={{color: 'blue'}}>{asS8}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as8}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP8}
          <br />
          Change: {asC8}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS8, 7)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(7, asS8, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as8, asP8, asC8, asS8)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>          <div style={{display: 'block', textAlign: 'left'}}>
          <h4 style={{color: 'blue'}}>{asS9}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as9}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP9}
          <br />
          Change: {asC9}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS9, 8)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(8, asS9, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as9, asP9, asC9, asS9)}>Save stock</Button>
          <br>
          </br></li>
          <br></br>
          <li class="list-group-item" style={{ display: 'flex', flexDirection: 'row', padding: '20px'}}>          <div style={{display: 'block', textAlign: 'left'}}>
          <h4 style={{color: 'blue'}}>{asS10}</h4><h5 class="card-title" style={{margin: '15px', marginLeft: '5px'}}>       {as10}</h5>
        
        <div class="card-text">
        <p>
          Price: {asP10}
          <br />
          Change: {asC10}
        </p>
  
        
        
        </div>
        </div>
          <Button class="buttonSpacing" variant="primary" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '296px', top: '2px'}} onClick={() => compParams(asS10, 9)}>About</Button>
          <Button class="buttonSpacing" style={{margin: '15px', height: '50px', position: 'absolute', right: '150px', top: '2px'}}  variant="primary" onClick={() =>stockListMulti(9, asS10, 'viewerSection', "TIME_SERIES_INTRADAY", 2)}>View stock</Button>
          <Button class="buttonSpacing" style={{ color: 'white', margin: '15px', height: '50px', position: 'absolute', right: '2px', top: '2px'}}  onClick={()=>addLike(as10, asP10, asC10, asS10)}>Save stock</Button>
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
          <Button variant="primary">Save stock</Button>
          </Modal.Footer>
        </Modal>
  </div>
  
      </div>
      <div style={{height: '450px', width: '400px'}}>
        <div id="aiSection" style={{backgroundColor: 'lightblue', borderRadius: '8px', borderColor: 'black', boxShadow: '5px 5px 10px rgba(21, 61, 219, 0.76)', padding: '10px', textAlign: 'center'}}>
        <h3 style={{color: 'black'}}>AI Assistant</h3>
        <img style={{borderRadius: '50%'}} src="https://cdn.dribbble.com/userupload/22460781/file/original-73dfd4921f8852c03728693bee46deb0.gif" width="50%" height="50%"/> <br></br>
<br></br>
<button className="modern-button assistant-button" style={{backgroundColor: 'blue'}} onClick={handleShow3}>
                Click here to ask AI assistant a question
                </button>
                <br></br>
                <br></br>
                <AIStockRecommendationTool />
  
        </div>
      

      <br></br>
      <Card id="currExchSection" style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
          <h3 style={{color: 'black', textAlign: 'center'}}>Get current exchange rates here</h3>
          <div style={{display: 'flex', gap: '10px', position: 'relative', marginLeft: 'auto', marginRight: 'auto'}}>
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
  
  <button className="btn btn-outline-primary me-2 d-flex align-items-center" style={{borderRadius: '10px'}} onClick={()=>getRate()}><div style={{textAlign: 'center'}}>Calculate rate</div></button>
  <br></br>
  <p>Result: {eRate}</p>
      </Card>
      

  </div>
  
      </div>
      <br></br>
      <br></br>
      <div id="savedList" style={{ borderRadius: "12px", backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', padding: '15px', width: '80%'}}>
          <h6 class="h6" style={{ fontWeight: 'bold', fontSize: '30px' }}>Saved stocks go here...</h6>
  
  <br /><br />
  <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  {
                list1.map((item, index) => {
                  return <div key={index} style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.6)', borderRadius: '12px', backgroundColor: 'white', margin: '10px' }}>
                  
                  <label style={{padding: '10px'}}>
                    <p>{list1[index]}</p>
                    <p>Symbol: {list4[index]}</p>
                    <p>Price value: {list2[index]}</p>
                    <p>Change: {list3[index]}</p>
                    <button style={{borderRadius: '10px'}} type="button" class="btn btn-primary" onClick={()=>stockListMulti(index, list4[index], 'viewerSection', "TIME_SERIES_INTRADAY", 0)}>View stock</button>
                  
                  </label>
                </div>
                }
              )}
              </div>
  </div>
  <br></br>
  <br></br>
      <div style={{display: 'flex', gap: '10px', width: '100%', height: '1000px'}}>
  
      
      
        <div style={{width: '120%'}}>
          
        <div id="viewerSection" class="yourSection" style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', width: '80%'}}>
  
          <h6 class="h6" style={{ fontWeight: 'bold', fontSize: '30px', marginLeft: 'auto', marginRight: 'auto' }}>Stock viewer</h6>
  
          <button variant="primary" className="btn btn-outline-primary me-2 d-flex align-items-center" onClick={handleShow} style={{ display: 'block', margin:'auto', float: 'right', borderRadius: '10px'}}>
          Edit saved list of stocks above
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
                    <button type="button" style={{borderRadius: '10px'}} class="btn btn-danger" onClick={() => removeLike(index)}>Remove item</button>
                  </label>
                </div>
                }
              )}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        
  <Modal show={show4} onHide={handleClose4}>
          <Modal.Header closeButton>
            <Modal.Title>What do you need help with?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
         <Link to="/whatStock"><Button style={{borderRadius: '10px'}}>What stock to invest in</Button></Link>
         <br></br>
         <Link to="/aifinance"> <Button style={{borderRadius: '10px'}}>How well I'm doing with my finances so far</Button></Link>
         <br></br>
          <Link to="/improveStocks"><Button style={{borderRadius: '10px'}}>How I can improve my investing</Button></Link>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
  <br></br>
  <div class="divStyle">
  
  <br></br>
  <br></br>
  
  
              </div>
  <br></br>
  <br></br>
  <p class="lead">Pick a time span that the graph below will display</p>
  
  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ display: 'block', margin:'auto', float: 'middle'}}>
  {
   
     
       <li class="nav-item" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}} class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={()=>updateData(symbols[currentGIndex], 1, "TIME_SERIES_INTRADAY", 1)}>View by recent hours</a>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(symbols[currentGIndex], 2, "TIME_SERIES_DAILY", 1)}>View by recent week</a>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(symbols[currentGIndex], 3, "TIME_SERIES_MONTHLY", 1)}>View by recent dates</a>
        <a style={{backgroundColor: 'white', color: 'black', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black', margin: '10px'}}class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"onClick={()=>updateData(symbols[currentGIndex], 4, "TIME_SERIES_ADJUSTED", 1)}>View by furthest dates</a>
  
      </li>
  }
                
  </ul>
    <div style={{width: '1000px'}}>
  <div style={{width: '1000px'}}>
    <div style={{width: '1000px'}}>
     <p class="lead" >Graph of {currentGraph}</p> 
    <Line
    data={chartData} options={chartOptions}>
    </Line>
          </div>
    </div>
    </div>
  <p class="lead">Extra data about the displayed stock</p>
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
  
  </div>
  <br></br>
  <div>
    
    
     
      </div>
      </div>
      <div>
        
  
        
      <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton>
            <Modal.Title>Ask AI a question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={sendToAI} >
              <div style={{display: 'flex'}}>
            <input placeholder='Type here...'
        type="text"
        class="form-control"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
      />
      <Button style={{borderRadius: '10px'}} onClick={(e)=>chatDo(e)}>Ask</Button>
      </div>
      <p fontSize='10px' class="lead">Response</p>
      <div style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
      <p>{res1}</p>
      </div>
            </form>
         
         <div class="modal-dialog modal-dialog-scrollable">
         <chatDo />
  </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        
      </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div id="newsSection" style={{ backgroundColor: 'white',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px', position: 'absolute', marginLeft: 'auto', marginRight: 'auto', width: '90%'}}>
      <h6 class="h6" style={{ fontWeight: 'bold', fontSize: '30px' }}>Latest in news</h6>
      <div style={{display: 'flex', gap: '3px'}}>
      <div>
      <div id="videoSection">
        <h3 style={{color: 'blue', display: 'block'}}>Videos related to {currentGraph}</h3>
        <div>
        
        <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${relatedVideoId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${relatedVideoId2}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${relatedVideoId3}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${relatedVideoId4}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${relatedVideoId5}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
        
          
       
        </div>
        
        
      </div>
        <h3 style={{color: 'blue', display: 'block'}}>General news videos</h3>
        <div>
        
        <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${videoId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${videoId2}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${videoId3}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${videoId4}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${videoId5}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
        
          
       
        </div>
        
        
      </div>
      
      <div>
      <h3 style={{color: 'blue'}}>Articles</h3>
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
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
     
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
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
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
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
     
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
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
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
     <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[11]} />
        <Card.Body>
          <Card.Title>{newsHeader[11]}</Card.Title>
          <Card.Text>
            {newsBody[11]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(9)} >More information</Button>
        </Card.Body>
      </Card>
  
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[12]} />
        <Card.Body>
          <Card.Title>{newsHeader[12]}</Card.Title>
          <Card.Text>
            {newsBody[12]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(10)} >More information</Button>
        </Card.Body>
      </Card>
      
      
  
     </div>
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
     <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[13]} />
        <Card.Body>
          <Card.Title>{newsHeader[13]}</Card.Title>
          <Card.Text>
            {newsBody[13]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(9)} >More information</Button>
        </Card.Body>
      </Card>
  
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[14]} />
        <Card.Body>
          <Card.Title>{newsHeader[14]}</Card.Title>
          <Card.Text>
            {newsBody[14]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(10)} >More information</Button>
        </Card.Body>
      </Card>
      
      
  
     </div>
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
     <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[15]} />
        <Card.Body>
          <Card.Title>{newsHeader[15]}</Card.Title>
          <Card.Text>
            {newsBody[15]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(9)} >More information</Button>
        </Card.Body>
      </Card>
  
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[16]} />
        <Card.Body>
          <Card.Title>{newsHeader[16]}</Card.Title>
          <Card.Text>
            {newsBody[16]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(10)} >More information</Button>
        </Card.Body>
      </Card>
      
      
  
     </div>
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px'}} class="col-lg-4 mb-3 d-flex align-items-stretch">
     <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[17]} />
        <Card.Body>
          <Card.Title>{newsHeader[17]}</Card.Title>
          <Card.Text>
            {newsBody[17]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(9)} >More information</Button>
        </Card.Body>
      </Card>
  
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={newsImage[18]} />
        <Card.Body>
          <Card.Title>{newsHeader[18]}</Card.Title>
          <Card.Text>
            {newsBody[18]}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow6(10)} >More information</Button>
        </Card.Body>
      </Card>
      
      
  
     </div>
     </div>
     {isVisible && (
     <button id="specialButton" style={{borderRadius: '10px'}} className="btn btn-outline-primary me-2 d-flex align-items-center" hidden={isHidden2} onClick={() => changeHidden()}>View more news</button>
     )}
     </div>
     
     </div>
     </div>
     <Modal show={show7} onHide={handleClose7}>
          <Modal.Header closeButton>
            <Modal.Title>More about {abSelect}</Modal.Title>
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
      </div>
    )
  }
  
  
  export default StockFunc





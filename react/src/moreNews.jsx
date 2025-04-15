import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Stocks from './StocksPage.jsx'
import './App.css'
import axios from 'axios';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'

export const moreNews = () => {
   
     const [companyName, setCompanyName]=useState("")
  const [newsHeader, setNewsHeader]=useState([])
  const [newsBody, setNewsBody]=useState([])
  const [newsImage, setNewsImage]=useState([])
  const [newsSentiment, setNewsSentiment]=useState([])
  const [newsSource, setNewsSource]=useState([])
  const [newsSourceDomain, setNewsSourceDomain]=useState([])
  const [newsData, setNewsData]=useState([])
  const [show, setShow] = useState(false);
      const [dSelect, setdSelect]=useState('')
const handleClose = () => setShow(false);
const handleShow = (value) => {
  setShow(true);
  setdSelect(value);

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

        for (let i = 12; i < 50; i++) {
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
  useEffect(()=> {
    getNews();
      }, [])
  return (
    <div style={{ justifyContent: 'center', 
      alignItems: 'center'}}>
    <div style={{display: 'flex'}}>
    <Link to="/stocks"><div style={{ position: 'fixed', left: '15%', top: '2%', zIndex: '2', backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px'}}>
    <img src="https://cdn-icons-png.freepik.com/512/3114/3114883.png" width="50px" height="50px"/>
    </div></Link> 
    

    </div>
    <div>
    <h1 style={{color: 'blue', backgroundColor: 'white',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px'}} class="quicksand-moreNewsStyle" >More Stocks News</h1>

    </div>
    <Modal show={show} onHide={handleClose}>
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
    <div>
    <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[1]}</h5>
        <img src={newsImage[1]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[1]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(1)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[2]}</h5>
        <img src={newsImage[2]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[2]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(2)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[3]}</h5>
        <img src={newsImage[3]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[3]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(3)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[4]}</h5>
        <img src={newsImage[4]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[4]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(4)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
<div class="col-sm-6">
<div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[5]}</h5>
        <img src={newsImage[5]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[5]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(5)}>More information</a>
      </div>
    </div>
    </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[6]}</h5>
        <img src={newsImage[6]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[6]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(6)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[7]}</h5>
        <img src={newsImage[7]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[7]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(7)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[8]}</h5>
        <img src={newsImage[8]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[8]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(8)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[9]}</h5>
        <img src={newsImage[9]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[9]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(9)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[10]}</h5>
        <img src={newsImage[10]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[10]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(10)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[11]}</h5>
        <img src={newsImage[11]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[11]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(11)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[12]}</h5>
        <img src={newsImage[12]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[12]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(12)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[13]}</h5>
        <img src={newsImage[13]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[13]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(13)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[14]}</h5>
        <img src={newsImage[14]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[14]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(14)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[15]}</h5>
        <img src={newsImage[15]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[15]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(15)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[16]}</h5>
        <img src={newsImage[16]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[16]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(16)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
<div class="row">
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[17]}</h5>
        <img src={newsImage[17]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[17]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(17)}>More information</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{newsHeader[18]}</h5>
        <img src={newsImage[18]} height="250px" width="250px"/>
        <p class="card-text">{newsBody[18]}</p>
        <a href="#" class="btn btn-primary" onClick={() => handleShow(18)}>More information</a>
      </div>
    </div>
  </div>
  
</div>
</div>
</div>
    
  )
}

export default moreNews;
/**
 *  <div style={{display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center'}}>
    <div style={{ padding: '10px', gap: '10px'}}>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[1]}</Card.Title>
                <img src={newsImage[1]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[1]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
          
</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[2]}</Card.Title>
                <img src={newsImage[2]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[2]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            
</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

<Card className="text-center">
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>{newsHeader[3]}</Card.Title>
    <img src={newsImage[3]} height="250px" width="250px"/>

    <Card.Text>
    {newsBody[3]}
    </Card.Text>
    <Button variant="primary">More information</Button>
  </Card.Body>
  <Card.Footer className="text-muted">Time published: </Card.Footer>
</Card>

</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[4]}</Card.Title>
                <img src={newsImage[4]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[4]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            
</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[5]}</Card.Title>
                <img src={newsImage[5]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[5]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            
</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[9]}</Card.Title>
                <img src={newsImage[9]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[9]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[10]}</Card.Title>
                <img src={newsImage[10]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[10]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[11]}</Card.Title>
                <img src={newsImage[11]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[11]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[13]}</Card.Title>
                <img src={newsImage[13]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[13]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[14]}</Card.Title>
                <img src={newsImage[14]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[14]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[15]}</Card.Title>
                <img src={newsImage[15]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[15]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
</div>
<div style={{ display: 'flex', width: '2000px', flexDirection: 'row'}}>

            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[17]}</Card.Title>
                <img src={newsImage[17]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[17]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[18]}</Card.Title>
                <img src={newsImage[18]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[18]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{newsHeader[19]}</Card.Title>
                <img src={newsImage[19]} height="250px" width="250px"/>

                <Card.Text>
                {newsBody[19]}
                </Card.Text>
                <Button variant="primary">More information</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Time published: </Card.Footer>
            </Card>
</div>
</div>
</div>
 */

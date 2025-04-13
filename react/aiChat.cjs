const PORT=8000
const express=require('express') //require this package
const cors=require('cors') //this package deals with cors messages
const app=express() //release under app variable
app.use(express.json()) //allows us to work with json when messaging (you can't pass json from the front end to the backend unless you have this)
app.use(cors())
const API_KEY='';
app.post('/route1', async (req, res)=>{
    const options={
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",  
        },
        body: JSON.stringify({
            model: "",
            messages: [{role: "user", content: "what is the weather today?"}],
            max_tokens: 100,  //every text prompt is tokenized
            
        })
    }
    try{
        const responseVal = await fetch('', options)
        const data = await response.json() //json() is also an async method
        res.send(data)
    }catch(error){
        console.log(error)
    }
})
app.listen(PORT, () => console.log('Your ai chatbot is running on port '+PORT))
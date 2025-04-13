const PORT=8000
const express=require('express') //require this package
const cors=require('cors') //this package deals with cors messages
const app=express() //release under app variable
app.use(express.json()) //allows us to work with json when messaging
app.use(cors())

app.listen(PORT, () => console.log('Your ai chatbot is running on port '+PORT))



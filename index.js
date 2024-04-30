const express = require("express")

const dotenv = require("dotenv").config()
// dotenv.config()

const bp = require('body-parser')

const cors = require('cors')

const router = require("./src/router")

const dbConnect = require("./src/db")

dbConnect()

const app = express()
app.use(bp.json())
app.use(cors())
app.use('/',router)


const port = process.env.PORT

// get homepage request

app.get('/',(req,res)=>{
    res.send("hello backend app")
})



// listening port
app.listen(5000,()=>{
    console.log("server started in PORT : ",port);
})

// npm init -> index.js file create 
// npm i express , dotenv , bodyparser , cors()

// mongoDB - 




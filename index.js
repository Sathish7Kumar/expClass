const express = require("express")

const dotenv = require("dotenv").config()
// dotenv.config()

const bp = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')

const app = express()
app.use(bp.json())
app.use(cors())

// url connection
const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log('db conected successfully');
    } catch (error) {
       console.log("db connection failure"); 
    }
}

dbConnect()

// schema 
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    mobileNum : Number
})

// model
const userData = mongoose.model("user",userSchema)

// routes : 

// post :
app.post('/users',async(req,res)=>{
    try {
        const {name,email,mobileNum} = req.body
        const user = await userData.findOne({email})
        if(user){
            res.send({message:"user already exists"})
        }
        else{
            const newUser = new userData({name,email,mobileNum})
            await newUser.save()
            res.send({message:"user created"})
        }
    } catch (error) {
        console.log("user creating user : " + error);
    }
})

// get : 

app.get('/users',async(req,res)=>{
    try {
        const allUser = await userData.find()
        res.send(allUser)
    } catch (error) {
        console.log("user getting user : " + error);
    } 
    })

// update : 
app.put('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const {name,email,mobileNum} = req.body
        await userData.findByIdAndUpdate(id,{name,email,mobileNum})
        res.send({message:"user Updated"})
    } catch (error) {
        console.log("user updating user : " + error);
    }
})

// delete 
app.delete('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await userData.findByIdAndDelete(id)
        res.send({message:"user deleted"})
    } catch (error) {
        console.log("user deleting user : " + error);
    }
})



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




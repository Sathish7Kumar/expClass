const express = require("express")
const dotenv = require("dotenv").config()
const bp = require('body-parser')
// dotenv.config()

const app = express()
app.use(bp.json())

const port = process.env.PORT

let userDetails = [
    {id:1,name:"pravin",email:"pravin@gmail.com"},
    {id:2,name:"vasu",email:"vasu@gmail.com"}
]

// get homepage request

app.get('/',(req,res)=>{
    res.send("hello backend app")
})

// get all users request

app.get('/users',(req,res)=>{
    res.send(userDetails)
})

// get selectedUser  request

app.get('/users/:id',(req,res)=>{
    const id = req.params.id
    const selectedUser= userDetails.filter((e)=> e.id == id )
    res.send(selectedUser)
})

// post request

app.post('/postUser',(req,res)=>{
    userDetails.push(req.body)
    res.send({message:"user created"})
})

// edit request :

app.put('/editUser',(req,res)=>{
    for(let i = 0; i < userDetails.length;i++){
        if(req.body.id == userDetails[i].id){
            userDetails[i].name =req.body.name;
            userDetails[i].email = req.body.email
        }
    }
    res.send({message:"user updated"})
})

// delete request

app.delete('/user/:id',(req,res)=>{
    const id = req.params.id
    let index
    for(i=0;i<userDetails.length;i++){
        if(id == userDetails[i].id){
            index = i
        }
    }
    userDetails.splice(index,1)
    res.send(userDetails)
})

// listening port
app.listen(5000,()=>{
    console.log("server started in PORT : ",port);
})

// npm init -> index.js file create 
// npm i express , dotenv , bodyparser




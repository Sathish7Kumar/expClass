 const express = require("express")
const userData = require("./schema")
const bcrypt = require('bcrypt')
const generateToken = require("./token")
const verifyToken = require("./verifyToken")

 const router = express.Router()

// routes :

// post :
router.post('/users',async(req,res)=>{
    try {
        const {name,email,mobileNum,password} = req.body
        const user = await userData.findOne({email})
        if(user){
            res.send({message:"user already exists"})
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new userData({name,email,mobileNum,password:hashedPassword})
            await newUser.save()
            res.send({message:"user created"})
        }
    } catch (error) {
        console.log("user creating user : " + error);
    }
})

// postLogin 

router.post('/users/login',async(req,res)=>{
    try {
        const {name,email,password} = req.body

        const user = await userData.findOne({email})
        // user = {id,name,email,password}
        if(user){
            const comparePwd = await bcrypt.compare(password,user.password)
            if(comparePwd){
                const token = generateToken(user)
                res.send({userName:user.name,userToken :token})
            }else{
                res.send({message:"invalid password"})
            }
        }else{
           res.send({message:"can't find user"}) 
        }
    } catch (error) {
        console.log("err logging in ",error);
    }
})

// get : 

router.get('/users',async(req,res)=>{
    try {
        const allUser = await userData.find()
        res.send(allUser)
    } catch (error) {
        console.log("user getting user : " + error);
    } 
    })

// get selected User 

router.get("/users/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const selected_user = await userData.findById(id )
        res.send(selected_user)
    } catch (error) {
        console.log("user getting user : " + error);
    }
})

router.get('/authUser',verifyToken,(req,res)=>{
    res.send({message:"welcome User"})
})

// update : 
router.put('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const {name,email,mobileNum,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        await userData.findByIdAndUpdate(id,{name,email,mobileNum,password:hashedPassword})
        res.send({message:"user Updated"})
    } catch (error) {
        console.log("user updating user : " + error);
    }
})

// delete 
router.delete('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await userData.findByIdAndDelete(id)
        res.send({message:"user deleted"})
    } catch (error) {
        console.log("user deleting user : " + error);
    }
})

module.exports = router

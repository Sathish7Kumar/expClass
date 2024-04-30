 const express = require("express")
const userData = require("./schema")

 const router = express.Router()

// routes :

// post :
router.post('/users',async(req,res)=>{
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

// update : 
router.put('/users/:id',async(req,res)=>{
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


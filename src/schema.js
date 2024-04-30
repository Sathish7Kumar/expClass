const mongoose = require('mongoose')

// schema 
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    mobileNum : Number,
    password : String
})

// model
const userData = mongoose.model("user",userSchema)

module.exports = userData
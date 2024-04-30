const mongoose = require('mongoose')

// schema 
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    mobileNum : Number
})

// model
const userData = mongoose.model("user",userSchema)

module.exports = userData
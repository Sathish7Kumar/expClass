const mongoose = require("mongoose");

// schema

// const userSchema = new mongoose.Schema({
//     name : String,
//     email : String,
//     mobileNum : Number,
//     password : String
// })

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNum: { type: Number, required: true },
  password: { type: String, required: true },
});

// model
const userData = mongoose.model("user", userSchema);

module.exports = userData;

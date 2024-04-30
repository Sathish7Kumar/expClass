const mongoose = require('mongoose')

// url connection
const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log('db conected successfully');
    } catch (error) {
       console.log("db connection failure"); 
    }
}

module.exports = dbConnect

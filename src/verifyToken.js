const jwt = require('jsonwebtoken')
const userData = require('./schema')
const privateKey = process.env.PRIVATE_KEY

const verifyToken = (req,res,next) => {
    const auth = req.headers.authorization
    if(auth){
        const token = auth.split(" ")[1]
        jwt.verify(token,privateKey,(err,decode)=>{
            if(err){
                res.send({message:"token invalid /  expired"})
            }
            const user = userData.findOne({email:decode.email})
            if(!user){
                res.send({message:"user not found"})
            }
        })
        next()
    }
    else{
        res.send({message:"token needed for authorization"})
    }
}

module.exports = verifyToken
const jwt = require('jsonwebtoken')

const privateKey = process.env.PRIVATE_KEY

const generateToken = (user) => jwt.sign(
    {id: user._id},
    privateKey,
    {expiresIn:"1m"}
)

module.exports = generateToken

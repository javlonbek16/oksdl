const jwt = require('jsonwebtoken')
require("dotenv").config()

const sign = (payload) => jwt.sign(payload, process.env.SECRET_API_KEY, {expiresIn: "24h"}); 
const verify = (payload) => jwt.verify(payload, process.env.SECRET_API_KEY); 

module.exports = {
    sign,
    verify
}
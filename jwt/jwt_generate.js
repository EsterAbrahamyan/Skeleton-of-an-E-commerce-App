const jwt = require('jsonwebtoken')
require('dotenv').config()


const SECRET= process.env.SECRET
 function generateAccessToken(user_id){
    return jwt.sign(user_id, SECRET, {expiresIn: "36000s" });
 }



 module.exports = {generateAccessToken}
    

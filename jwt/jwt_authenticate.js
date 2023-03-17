const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("database.db")

function authenticateToken(req, res, next) {
      const token = req.headers['authorization'];
      
      if (token == null){
          return res.sendStatus(401)
      } 
      
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403)
        }
        const {role}= user
        if (role != "admin"){
          return res.sendStatus(403)
        }
      next()
      
      })
    }

    function authenticateTokenCart(req, res, next){
      const token= req.headers.authorization
      if(token ==  null){
          return res.sendStatus(401)
      }
      jwt.verify(token, SECRET, (err, user)=>{
          if(err){
              return res.sendStatus(403)
          }
          const {role, username} = user
          req.user = {id: null, role, username}
          db.get("select id from users where username=?", [username], (err, row)=>{
              if(row){
                  req.user.id = row.id
                }
                next()
            })
        })
        }


    function checkRole(req, res){
        const token = req.headers.authorization
        const decoded = jwt.decode(token)
        const role = decoded.role
        return role
    }
    
    module.exports={authenticateToken, checkRole,authenticateTokenCart}
        
    
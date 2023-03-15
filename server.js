const express = require('express');
const sqlite3 = require("sqlite3").verbose();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const app = express();
const port = 6000;
app.use(express.json());
require('dotenv').config();
const users_schema=require('./models/users_schema')
const products_schema=require('./models/products_schema')
const users_routes=require('./routes/users_routes')



const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.log('It is wrong');
    }
    console.log('All right');
});



// db.run("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY,username TEXT,userpassword TEXT,userrole TEXT)");
// db.run("CREATE TABLE IF NOT EXISTS products(product_id INTEGER PRIMARY KEY,price INTEGER NOT NULL,name TEXT)");

users_schema.create_users(db)
products_schema.create_products(db)
users_routes.users_routes_get(app)
users_routes.users_routes_get_id(app)
users_routes.users_routes_post(app)
users_routes.users_routes_put(app)
users_routes.users_routes_delete(app)
users_routes.users_routes_register(app)
users_routes.users_routes_login(app)


// app.get('/', (req, res) => {
//     db.all('SELECT * FROM products', [], (err, data) => {
//         res.send(data);
//     });
// });




// app.get('/get/:id', (req, res) => {
//     const id = req.params.id
//     console.log(id);
//     db.get('SELECT * FROM database WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     })
    
// })

// app.post('/new', authenticateToken,(req,res)=>{
//     const price=req.body.price;
//     const name=req.body.name;
//     db.run('INSERT INTO products (price,name) VALUES (?, ?)',[price,name],(err)=>{
//         res.send('OK')
//     })
// })

// app.post("/register", (req, res) => {
//     const username = req.body.username;
//     const userpassword = req.body.userpassword;
//     const userrole = req.body.userrole;
    
//     const hashed_password = CryptoJS.SHA256(userpassword).toString();
//     let sql = "INSERT INTO users (username,userpassword,userrole) VALUES (?, ?, ?)";
//     db.run(sql, [username, hashed_password,userrole,], function (err) {
//       if (err) {
//         res.send(JSON.stringify({ status: "Error Registering" }));
//       }
//       res.send(JSON.stringify({ status: "User Created" }));
//     });
//   });

//  const SECRET= process.env.SECRET
//  function generateAccessToken(username,role){
//     return jwt.sign({username,role}, SECRET, {expiresIn: "36000s" });
//  }
 
 
 
  // app.post("/login", (req, res) => {
  //   const username = req.body.username;
  //   const userpassword = req.body.userpassword;
   
  //   const hashed_password = CryptoJS.SHA256(userpassword).toString();
  //   let sql = "SELECT * from users WHERE username = ?";
  //   db.get(sql, [username], function (err, row) {
  //     let token = generateAccessToken(username, row.userrole);
  //     if (username == row.username && hashed_password == row.userpassword) {
  //       res.send(JSON.stringify({ status: "Logged in",jwt:token }));
  //     } else {
  //       res.send(JSON.stringify({ status: "Wrong credentials" }));
  //     }
  //   });
  // });


  // function authenticateToken(req, res, next) {
  //   const token = req.headers['authorization'];
    
  //   if (token == null){
  //       return res.sendStatus(401)
  //   } 
    
  //   jwt.verify(token, SECRET, (err, user) => {
  //     if (err) {
  //       return res.sendStatus(403)
  //     }
  //     const {role}= user
  //     if (role != "admin"){
  //       return res.sendStatus(500)
  //     }
  //   next()
    
  //   })
  // }


// app.put('/put/:id',  authenticateToken, (req, res) => {
//     const price=req.body.price;
//     const name=req.body.name;
//     const id=req.params.id
    
//     db.run('UPDATE products SET price=?, name=? WHERE id=?',[price,name,id],(err)=>{
//          res.send("OK")
        
//     })
// })

// app.delete('/delete/:id', authenticateToken, (req, res) => {
//     const id = req.params.id
    
//     db.run('DELETE FROM products WHERE id=?', [id], (err) => {
//         res.send("OK")
        
//     })
// })




app.listen(port);

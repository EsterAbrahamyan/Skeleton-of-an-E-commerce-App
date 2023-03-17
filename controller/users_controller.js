const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("database.db")
const CryptoJS = require('crypto-js')
const jwt_generate = require("../jwt/jwt_generate")



function get_data (req, res) {
    db.all('SELECT * FROM products', [], (err, data) => {
        res.send(data)
    })
}

function get_data_id (req, res) {
    const id = req.params.id
    db.get('SELECT * FROM products WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
    
}

function post_data (req,res) {
    const price=req.body.price;
    const name=req.body.name;
    db.run('INSERT INTO products (price,name) VALUES (?, ?)',[price,name],(err)=>{
        res.send('OK')
    })
}

function put_data (req, res) {
    const price=req.body.price;
    const name=req.body.name;
    const id=req.params.id
    db.run('UPDATE products SET price=?, name=? WHERE id=?',[price,name,id],(err)=>{
         res.send("OK")
        
    })
}

function delete_data (req, res) {
    const id = req.params.id
    
    db.run('DELETE FROM products WHERE id=?', [id], (err) => {
        res.send("OK")
        
    })
}

function registerUser (req, res) {
    const username = req.body.username;
    const userpassword = req.body.userpassword;
    
    
    const hashed_password = CryptoJS.SHA256(userpassword).toString();
    let sql = "INSERT INTO users (username,userpassword,userrole) VALUES (?, ?, ?)";
    db.run(sql, [username, hashed_password,"user"], function (err) {
      if (err) {
        res.send(JSON.stringify({ status: "Error Registering" }));
      }
      res.send(JSON.stringify({ status: "User Created" }));
    });
  }

  function loginUser(req, res) {
    const username = req.body.username;
    const userpassword = req.body.userpassword;
   
    const hashed_password = CryptoJS.SHA256(userpassword).toString();
    let sql = "SELECT * from users WHERE username = ?";
    db.get(sql, [username], function (err, row) {
      let token = jwt_generate.generateAccessToken(username, row.userrole);
      if (username == row.username && hashed_password == row.userpassword) {
        res.send(JSON.stringify({ status: "Logged in",jwt:token }));
      } else {
        res.send(JSON.stringify({ status: "Wrong credentials" }));
      }
    });
}
 




module.exports={get_data,  get_data_id, post_data,
                 put_data, delete_data,
               registerUser, loginUser,};
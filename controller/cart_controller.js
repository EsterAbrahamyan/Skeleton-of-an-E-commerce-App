const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("database.db")
const jwt = require('jsonwebtoken')


function get_product (req, res) {
    const token= req.headers.authorization;
    const decoded=jwt.decode (token);
    

    db.all ('SELECT * FROM cartItems where cart_id=?',[JSON.stringify(decoded.user_id)], (err,data) => {
      if (err){
        console.log(err);
      }
      res.send(data);
    });

  };




function post_product (req, res) {
   
    const product_id= req.body.product_id;
    const quantity= req.body.quantity;
    const token= req.headers.authorization;
    const decoded=jwt.decode (token);

   db.run('INSERT INTO cartItems (cart_id, product_id,quantity) VALUES (?, ?, ?)',[decoded.user_id, product_id,quantity], (err) => {
     if (err){
       console.log(err);
     }
     res.send('Product added to cart');
   });
   
    
};


  function delete_product (req, res) {
    const product_id = req.body.product_id;
    const token= req.headers.authorization
    const decoded=jwt.decode (token)

    db.run ('DELETE FROM cartItems where cart_id=? and product_id=?', [decoded.user_id,product_id], (err,data) => {
      if (err){
        console.log(err);
      }
     res.send('Product deleted from cart');
    });

  };



  module.exports={post_product,get_product,delete_product}
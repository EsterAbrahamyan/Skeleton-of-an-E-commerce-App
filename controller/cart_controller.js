const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("database.db")


function get_product (req, res) {
    const cart_id = req.body.cart_id;
    const product_id = req.body.product_id;
    console.log(cart_id,product_id)
    db.all ('SELECT * FROM cartItems WHERE cart_id = ? and product_id=?',[cart_id,product_id], (err,data) => {
      if (err){
        console.log(err);
      }
      res.send(data);
    });
  };




function post_product (req, res) {
    const cart_id = req.body.cart_id;
    const  product_id= req.body.product_id;
    const quantity= req.body.quantity
    console.log(cart_id,product_id,quantity);
    db.run('INSERT INTO cartItems (cart_id, product_id,quantity) VALUES (?, ?,?)',[cart_id, product_id,quantity], (err) => {
      if (err){
        console.log(err);
      }
      res.send('Product added to cart');
    });
  };


  function delete_product (req, res) {
    const cart_id = req.body.cart_id;
    const product_id = req.body.product_id;
    
    db.run ('DELETE FROM cartItems where cart_id=? and product_id=?', [cart_id, product_id], (err,data) => {
      if (err){
        console.log(err);
      }
     res.send('Product deleted from cart');
    });
  };



  module.exports={post_product,get_product,delete_product}
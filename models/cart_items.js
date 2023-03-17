const sql=("CREATE TABLE IF NOT EXISTS cartItems(cart_item_id INTEGER PRIMARY KEY,cart_id INTEGER NOT NULL,product_id INTEGER NOT NULL,quantity INTEGER NOT NULL,FOREIGN KEY (cart_id) REFERENCES cart(cart_id),FOREIGN KEY (product_id) REFERENCES products(product_id))");

 

function create_cartItems(db){
    db.run(sql)
}   
  

module.exports={create_cartItems};
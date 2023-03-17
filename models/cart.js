const sql=("CREATE TABLE IF NOT EXISTS cart(cart_id INTEGER PRIMARY KEY,user_id INTEGER NOT NULL,FOREIGN KEY (user_id) REFERENCES Users(user_id))");
    
    
function create_cart(db){
    db.run(sql)
}   
  

module.exports={create_cart};





    
   
    
    
    
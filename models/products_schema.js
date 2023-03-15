const sql=("CREATE TABLE IF NOT EXISTS products(product_id INTEGER PRIMARY KEY,price INTEGER NOT NULL,name TEXT)");

function create_products(db){
    db.run(sql)
}


module.exports={create_products};
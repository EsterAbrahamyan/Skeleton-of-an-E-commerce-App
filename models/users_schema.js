const sql=("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY,username TEXT,userpassword TEXT,userrole TEXT)");

function create_users(db){
    db.run(sql)
}


module.exports={create_users};
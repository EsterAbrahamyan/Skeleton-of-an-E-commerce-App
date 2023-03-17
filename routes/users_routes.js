const users_controller=require('../controller/users_controller')
const jwt_authenticate = require("../jwt/jwt_authenticate")


function users_routes_get(app){
    app.get('/', users_controller.get_data)
}

function users_routes_get_id(app){
    app.get('/get/:id', users_controller.get_data_id)
}

function users_routes_post(app){
    app.post('/new', jwt_authenticate.authenticateToken, users_controller.post_data)
}

function users_routes_put(app){
    app.put('/put/:id', jwt_authenticate.authenticateToken, users_controller.put_data)
}

function users_routes_delete(app){
    app.delete('/delete/:id', jwt_authenticate.authenticateToken, users_controller.delete_data)
}

function users_routes_register(app){
    app.post('/register', users_controller.registerUser)
}

function users_routes_login(app){
    app.post('/login', users_controller.loginUser)
}





   

module.exports = {users_routes_get, users_routes_get_id, 
                  users_routes_post,users_routes_put, 
                  users_routes_delete,users_routes_register, 
                  users_routes_login}

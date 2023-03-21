const cart_controller=require('../controller/cart_controller')
const jwt_authenticate = require('../jwt/jwt_authenticate')




function products_routes_get(app){
    app.get('/cart',jwt_authenticate.authenticateTokenCart, cart_controller.get_product)
}


function products_routes_post(app){
    app.post('/cart/add',jwt_authenticate.authenticateTokenCart, cart_controller.post_product)
}


function products_routes_delete(app){
    app.delete('/cart/delete',jwt_authenticate.authenticateTokenCart, cart_controller.delete_product)
}





module.exports ={products_routes_post,
                 products_routes_get,
                 products_routes_delete}
const express = require('express')

const routes = express.Router()

// upload API routes

routes.use(require('./routes/post/signup.routes'))
routes.use(require('./routes/post/login.routes'))
routes.use(require('./routes/post/google.signup.routes'))
routes.use(require('./routes/post/google.login.routes'))
routes.use(require('./routes/post/token.routes'))
routes.use(require('./routes/post/seller.routes'))
routes.use(require('./routes/post/product.routes'))
routes.use(require('./routes/post/user.address.routes'))
routes.use(require('./routes/post/user.details.routes'))
routes.use(require('./routes/post/cart.routes'))
routes.use(require('./routes/post/order.routes'))
routes.use(require('./routes/post/review.routes'))
routes.use(require('./routes/post/wishlist.routes'))
routes.use(require('./routes/post/checkoutSession.routes'))

// fetch API routes

routes.use(require('./routes/get/user.routes'))
routes.use(require('./routes/get/user.address.routes'))
routes.use(require('./routes/get/user.details.routes'))
routes.use(require('./routes/get/cart.routes'))
routes.use(require('./routes/get/order.routes'))
routes.use(require('./routes/get/product.category.routes'))
routes.use(require('./routes/get/seller.routes'))
routes.use(require('./routes/get/review.routes'))
routes.use(require('./routes/get/wishlist.routes'))
routes.use(require('./routes/get/search.routes'))
routes.use(require('./routes/get/product.routes'))
routes.use(require('./routes/get/tokenValidation.routes'))



module.exports = routes

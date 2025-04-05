const express = require('express')
const verifyToken = require('../../middlewares/verifyToken')
const handleProduct = require('../../controller/post/product.controler')

const routes = express.Router()
routes.post('/product-form',verifyToken,handleProduct)

module.exports = routes
const express = require('express')
const handleCart = require('../../controller/get/cart.controler')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.get('/get-cart',verifyToken,handleCart)

module.exports = routes
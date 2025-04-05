const express = require('express')
const handleOrder = require('../../controller/get/order.controler')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.get('/get-order',verifyToken,handleOrder)

module.exports = routes
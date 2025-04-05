const express = require('express')
const  handleOrder  = require('../../controller/post/order.controler')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.post('/order',verifyToken,handleOrder)

module.exports = routes
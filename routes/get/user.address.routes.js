const express = require('express')
const verifyToken = require('../../middlewares/verifyToken')
const handleUserAddress = require('../../controller/get/user.address.controler')

const routes = express.Router()
routes.get('/get-user-address',verifyToken,handleUserAddress)

module.exports = routes
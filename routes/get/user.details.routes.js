const express = require('express')
const verifyToken = require('../../middlewares/verifyToken')
const handleUserDetails = require('../../controller/get/user.details.controler')

const routes = express.Router()
routes.get('/get-user-details',verifyToken,handleUserDetails)

module.exports = routes
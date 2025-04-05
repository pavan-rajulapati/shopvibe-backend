const handleUserDetails = require('../../controller/post/user.details.controler')
const express = require('express')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.post('/user-details',verifyToken,handleUserDetails)

module.exports = routes
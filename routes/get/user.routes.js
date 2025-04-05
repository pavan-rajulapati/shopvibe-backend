const express = require('express')
const verifyToken = require('../../middlewares/verifyToken')
const handleUser = require('../../controller/get/user.controler')

const routes = express.Router()
routes.get('/get-user',verifyToken,handleUser)

module.exports = routes
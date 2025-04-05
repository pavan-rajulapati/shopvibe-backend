const express = require('express')
const handleWishlist = require('../../controller/get/wishlist.controler')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.get('/wishlist',verifyToken,handleWishlist)

module.exports = routes
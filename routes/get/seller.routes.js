const express = require('express')
const handleSeller = require('../../controller/get/seller.controler')

const routes = express.Router()
routes.get('/seller-dashboard/:sellerId', handleSeller)

module.exports = routes
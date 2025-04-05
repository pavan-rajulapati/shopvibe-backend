const express = require('express')
const handleCategory = require('../../controller/get/product.category.controler')

const routes = express.Router()
routes.get('/get-category/:category',handleCategory)

module.exports = routes
const express = require('express')
const handleReview = require('../../controller/get/review.controler')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.get('/review',verifyToken,handleReview)

module.exports = routes
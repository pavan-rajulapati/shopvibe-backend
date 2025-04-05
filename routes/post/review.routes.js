const express = require('express')
const handleReview = require('../../controller/post/review.controler')
const verifyToken = require('../../middlewares/verifyToken')

const routes = express.Router()
routes.post('/review',verifyToken,handleReview)

module.exports = routes
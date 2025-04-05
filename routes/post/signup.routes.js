const express = require('express')
const handleSignup = require('../../controller/post/signup.controler')

const routes = express.Router()
routes.post('/signup',handleSignup);

module.exports = routes
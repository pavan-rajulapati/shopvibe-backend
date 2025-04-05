const express = require('express')
const handleGoogleLogin = require('../../controller/post/google.login.controler')

const routes = express.Router()
routes.post('/google-login',handleGoogleLogin);

module.exports = routes
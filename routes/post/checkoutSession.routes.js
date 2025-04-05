const CheckoutSession = require('../../controller/post/checkoutSession');
const verifyToken = require('../../middlewares/verifyToken');
const express = require('express');

const routes = express.Router();

routes.post('/checkout/session', verifyToken, CheckoutSession);

module.exports = routes;

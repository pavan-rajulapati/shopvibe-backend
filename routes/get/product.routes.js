const express = require('express');
const  getTotalProducts  = require('../../controller/get/product.controler');

const router = express.Router();
router.get('/product/:productId', getTotalProducts);

module.exports = router;
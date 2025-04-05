const tokenValidation = require('../../middlewares/tokenValidation');
const express = require('express');
const router = express.Router();

router.get('/tokenValidation', tokenValidation);

module.exports = router;
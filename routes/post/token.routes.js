const express = require('express');
const verifyToken = require('../../middlewares/verifyToken');

const routes = express.Router();

routes.post('/token', verifyToken, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
});

module.exports = routes;

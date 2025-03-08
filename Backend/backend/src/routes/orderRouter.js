const express = require('express');

const orderRouter = express.Router();

const {AllOrders,addOrders} = require('../controllers/orderController.js');

orderRouter.route('/').get(AllOrders).post(addOrders);

module.exports = orderRouter;
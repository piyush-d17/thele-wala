const express = require('express');

const orderRouter = express.Router();

const {AllOrders,addOrders,acceptOrder, rejectOrder} = require('../controllers/orderController.js');
const orderModel = require('../models/order.model.js');

orderRouter.route('/').get(AllOrders).post(addOrders);
orderRouter.route('/accept-status/:id').post(acceptOrder);
orderRouter.route('/reject-status/:id').post(rejectOrder);

module.exports = orderRouter;
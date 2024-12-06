const express = require('express')

const orderRouter = express.Router()
const placeOrder = require('../controllers/placeOrder.controller.js')

orderRouter.route('/place').post(placeOrder)

module.exports = orderRouter;
const express =require('express');

const subscribeRouter = express.Router();

const {subsc,payOrder}=require('../controllers/sub.controller.js')

subscribeRouter.route('/add').get(subsc);
subscribeRouter.route('/order').post(payOrder);

module.exports=subscribeRouter;
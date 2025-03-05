const express = require('express');

const profileRouter = express.Router();

const {myProfile,ordersForMe,addSellerMenu,getSellerMenu,clearMyMenu,acceptRequest_order,rejectRequest_order} = require('../controllers/profilecontroller.js')

profileRouter.route('/my').get(myProfile)
profileRouter.route('/myOrders').get(ordersForMe);
profileRouter.route('/add/cate/sub-cat').post(addSellerMenu).get(getSellerMenu);
profileRouter.route('/cate/clear').get(clearMyMenu);
profileRouter.route('/accept/request').post(acceptRequest_order);
profileRouter.route('/reject/request').get(rejectRequest_order);

module.exports = profileRouter
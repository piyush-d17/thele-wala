const express =require('express');

const subscribeRouter = express.Router();

const {subcDetail,subsc}=require('../controllers/sub.controller.js')

subscribeRouter.route('/get').get(subcDetail);
subscribeRouter.route('/add').post(subsc);

module.exports=subscribeRouter;
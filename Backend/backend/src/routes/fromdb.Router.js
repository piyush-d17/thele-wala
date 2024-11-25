const express = require('express');
const fromdbRouter = express.Router();

const {viewData,view,allBuyers,allseller,viewDataOne,updateData,deleteData} = require('../controllers/fromDB.controller.js');

fromdbRouter.route('/view').get(viewData);
fromdbRouter.route('/view/em').get(view);
fromdbRouter.route('/v/allBuyer').get(allBuyers);
fromdbRouter.route('/v/allseller').get(allseller);
fromdbRouter.route('/view/:id').get(viewDataOne);
fromdbRouter.route('/update/:id').patch(updateData);
fromdbRouter.route('/delete/:id').delete(deleteData);

module.exports = fromdbRouter;
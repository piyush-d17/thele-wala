const express = require('express');
const fromdbRouter = express.Router();

const {allUsersWithLocations,view,allBuyersWithLocations,allSellersWithLocations,viewDataOne,updateData,deleteData} = require('../controllers/fromDB.controller.js');

fromdbRouter.route('/view').get(allUsersWithLocations);
fromdbRouter.route('/view/em').get(view);
fromdbRouter.route('/v/allBuyer').get(allBuyersWithLocations);
fromdbRouter.route('/v/allseller').get(allSellersWithLocations);
fromdbRouter.route('/view/:id').get(viewDataOne);
fromdbRouter.route('/update/:id').patch(updateData);
fromdbRouter.route('/delete/:id').delete(deleteData);

module.exports = fromdbRouter;
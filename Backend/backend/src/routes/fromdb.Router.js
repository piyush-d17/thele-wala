const express = require('express');
const fromdbRouter = express.Router();

const {viewData,viewDataOne,updateData,deleteData} = require('../controllers/fromDB.controller.js')

fromdbRouter.route('/view').get(viewData);
fromdbRouter.route('/view/:id').get(viewDataOne);
fromdbRouter.route('/update/:id').patch(updateData);
fromdbRouter.route('/delete/:id').delete(deleteData);

module.exports = fromdbRouter;
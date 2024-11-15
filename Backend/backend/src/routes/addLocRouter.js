const express = require('express')
const addLocationRouter = express.Router();
const addloc = require('../controllers/addloc.controller.js')

addLocationRouter.route('/locat').post(addloc);

module.exports = addLocationRouter;
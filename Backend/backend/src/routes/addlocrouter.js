const express = require('express');
const addlocrouter = express.Router();
const {getlocContr,addlocContr,uplocContr}=require('../controllers/addl.controller.js')

addlocrouter.route('/view').get(getlocContr)
addlocrouter.route('/add').post(addlocContr)
addlocrouter.route('/add/:id').patch(uplocContr)

module.exports=addlocrouter;
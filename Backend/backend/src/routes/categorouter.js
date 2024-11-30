const express=require('express')
const categorouter=express.Router();
const {addCategory,viewCategory,searchCategory}=require('../controllers/cate.controller.js');
categorouter.route('/add').post(addCategory)
categorouter.route('/view').get(viewCategory)
categorouter.route('/search').post(searchCategory)
module.exports=categorouter;
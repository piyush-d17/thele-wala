const express = require('express');

const profileRouter = express.Router();

const {myProfile} = require('../controllers/profilecontroller.js')

profileRouter.route('/my').get(myProfile)

module.exports = profileRouter
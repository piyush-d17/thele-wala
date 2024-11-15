const express = require('express')
const authUserRouter = express.Router();

const {registerUser,loginUser,logoutUser} = require('../controllers/authUser.controller.js')

authUserRouter.route('/register').post(registerUser)
authUserRouter.route('/login').post(loginUser)
authUserRouter.route('/logout').post(logoutUser)

module.exports = authUserRouter;
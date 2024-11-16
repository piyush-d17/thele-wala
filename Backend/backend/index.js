const express = require('express')
require('dotenv').config();
const connectDB = require('./src/db/connectDB.js')
const authUserRouter = require('./src/routes/authUserRouter.js')
const fromdbRouter = require('./src/routes/fromdb.Router.js')
const verifyToken = require('./src/middleware/auth.middleware.js')
const locationself = require('./src/controllers/location.controller.js')
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth',authUserRouter); // for register, login, logout

app.use('/api/v1/fromDB',verifyToken,fromdbRouter);// used to get complete data from database  CRUD only by develepors

app.get('/api/v1/ip',verifyToken,locationself); // get ip address and location details with lattitude and longitude

connectDB(process.env.URL);
app.listen(process.env.PORT,()=>console.log("connected to PORT ",process.env.PORT))
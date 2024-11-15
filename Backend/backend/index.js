const express = require('express')
require('dotenv').config();
const connectDB = require('./src/db/connectDB.js')
const authUserRouter = require('./src/routes/authUserRouter.js')
const addLocationRouter = require('./src/routes/addLocRouter.js')
const locationself = require('./src/controllers/location.controller.js')
const app = express();

app.use(express.json());

app.use('/api/v1/auth',authUserRouter); // for register, login, logout

app.use('/api/v1/addLocation',addLocationRouter) // add location in db from long. & lat

app.get('/api/v1/ip',locationself); // get ip address and location details with lattitude and longitude

connectDB(process.env.URL);
app.listen(process.env.PORT,()=>console.log("connected to PORT ",process.env.PORT))
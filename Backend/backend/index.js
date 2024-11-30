const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/db/connectDB.js');
const authUserRouter = require('./src/routes/authUserRouter.js');
const fromdbRouter = require('./src/routes/fromdb.Router.js');
const verifyToken = require('./src/middleware/auth.middleware.js');
const locationself = require('./src/controllers/location.controller.js');
const placeOrder = require('./src/controllers/placeOrder.controller.js');
const goliveRouter = require('./src/routes/goliveRouter.js')
const cookieParser = require('cookie-parser');
const coorRoute = require('./src/routes/coorRoute.js')
const addlocrouter=require('./src/routes/addlocrouter.js')
const categorouter=require('./src/routes/categorouter.js')
const {addCategory,viewCategory,searchCategory}=require("./src/controllers/cate.controller.js");
const onlyseller=require('./src/middleware/onlySeller.middleware.js');
const onlybuyer=require('./src/middleware/onlybuyer.middleware.js');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);



const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: 'GET, POST', // Allow necessary HTTP methods
    credentials: true, // Allow cookies to be sent
  };

app.use(cors(corsOptions));  
app.use((req, res, next) => {
  req.io = io; // Attach socket.io to req
  next();
});
app.use(express.json());
app.use(cookieParser());

//1. Route to register, login, logout
app.use('/api/v1/auth', authUserRouter);

//2.strore coordinates 
app.use('/ap/v1/addloc',verifyToken,addlocrouter)

//3. Route for CRUD, with all users(Buyers, sellers)
app.use('/api/v1/fromDB', verifyToken, fromdbRouter);

//4.category 
app.post('/api/v1/cate/add',verifyToken,addCategory);
app.post('/api/v1/cate/view',verifyToken,viewCategory);
app.post('/api/v1/cate/search',verifyToken,(req,res)=>searchCategory(req,res,io));

// app.use('/api/v1/cate',verifyToken,categorouter)

// 5.Route to place an order (now with correct middleware setup)
// app.post('/api/v1/order', verifyToken, (req, res) => placeOrder(req, res, io));

//(NOT IN USE).Route to get coordinate of logined user 
// app.use('/api/v1/coor',verifyToken,coorRoute);

//.{NOT IN USE} Route to get IP address and location details with latitude and longitude
// app.get('/api/v1/ip', verifyToken, locationself);

//(NOT IN USE). live go button api
// app.use('/api/v1/golive',verifyToken,goliveRouwwwqhyikro


connectDB(process.env.URL);
server.listen(process.env.PORT, () => {
    console.log("Server connected to PORT", process.env.PORT);
});

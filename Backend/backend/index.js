const express = require('express');
const http = require('http');
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

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001', // Replace with the URL of your frontend
}));

app.use(express.json());
app.use(cookieParser());

//1. Route to register, login, logout
app.use('/api/v1/auth', authUserRouter);

//2. Route to get IP address and location details with latitude and longitude
app.get('/api/v1/ip', verifyToken, locationself);

//3. Route for CRUD, with all users(Buyers, sellers)
app.use('/api/v1/fromDB', verifyToken, fromdbRouter);

//4.Route to get coordinate of logined user
app.use('/api/v1/coor',verifyToken,coorRoute);

// 5.Route to place an order (now with correct middleware setup)
app.post('/api/v1/order', verifyToken, (req, res) => placeOrder(req, res, io));

//6. live go button api
app.use('/api/v1/golive',verifyToken,goliveRouter);




connectDB(process.env.URL);
server.listen(process.env.PORT, () => {
    console.log("Server connected to PORT", process.env.PORT);
});

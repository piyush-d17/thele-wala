const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/db/connectDB.js');
const authUserRouter = require('./src/routes/authUserRouter.js');
const fromdbRouter = require('./src/routes/fromdb.Router.js');
const verifyToken = require('./src/middleware/auth.middleware.js');
const cookieParser = require('cookie-parser');
const addlocrouter=require('./src/routes/addlocrouter.js')
const {addCategory,viewCategory,searchCategory}=require("./src/controllers/cate.controller.js");
const subscription=require('./src/middleware/checkSubscribe.js');
const subscribeRouter=require('./src/routes/subscribeRouter.js')
const profileRouter = require('./src/routes/profileRouter.js')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);



const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests from any origin
    methods: 'GET, POST, PUT, DELETE', // List all methods you want to allow
    credentials: true, // Disable cookies if `origin` is set to '*'
};

app.use(cors(corsOptions));  

app.use(express.json());
app.use(cookieParser());


//1. Route to register, login, logout
app.use('/api/v1/auth', authUserRouter);

//2.strore coordinates 
app.use('/ap/v1/addloc',verifyToken,addlocrouter)

//3. Route for CRUD, with all users(Buyers, sellers)
app.use('/api/v1/fromDB', verifyToken, fromdbRouter);

app.use('/api/v1/myprf',verifyToken,profileRouter)

//4.subscription
app.use('/api/v1/cost',verifyToken,subscribeRouter);

//5.category 
app.post('/api/v1/cate/add',verifyToken,addCategory);
app.get('/api/v1/cate/view',verifyToken,viewCategory);
app.post('/api/v1/cate/search',verifyToken,(req,res)=>searchCategory(req,res,io));// by searching order message can be sent to sellers

connectDB(process.env.URL);
server.listen(process.env.PORT, () => {
  console.log("Server connected to PORT", process.env.PORT);
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import socketHandler from "./io/index.js";
import http from "http"
import { Server } from 'socket.io';

import { authenticateToken } from './middleware/authenticateToken.js';
import userRoute from './routes/user.js';
<<<<<<< HEAD
import chatRoute from './routes/chat.js'
import listingRoute from './routes/listing.js';
import tradeRoute from './routes/trade.js';
import otpRoute from "./routes/otp.js";

const CONNECTION_URL = "mongodb+srv://root:gqLWw1AzUDMjv2RU@cluster0.kh5y6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const PORT = process.env.PORT || 5000

dotenv.config();
=======
import chatRoute from './routes/chat.js';
import listingRoute from './routes/listing.js';
import tradeRoute from './routes/trade.js';
import otpRoute from "./routes/otp.js";
>>>>>>> 5bb0741354ff8b4fbb3895d55d4f2e93d7acb15c

const CONNECTION_URL = "mongodb+srv://root:gqLWw1AzUDMjv2RU@cluster0.kh5y6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const PORT = process.env.PORT || 5000

dotenv.config();

const app = express();

dotenv.config();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true})); //instead of bodyParser use this
app.use(cors())
// route middlewares
app.use('/api/user',userRoute);
app.use('/api/otp',otpRoute)
app.use('/api',authenticateToken,listingRoute)
app.use('/api',authenticateToken,tradeRoute)
app.use('/api/chat',authenticateToken,chatRoute)

const server = http.createServer(app);
const io = new Server(server,{cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }})

socketHandler(io);



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
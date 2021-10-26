<<<<<<< HEAD
import express from "express";
import cors from "cors";
import {Server} from "socket.io"
import http from "http"
import socketHandler from "./io";



const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }})

io.on("connection",socketHandler)

// app.use(router);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
=======
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import routes
import userRoute from './routes/user.js';


const CONNECTION_URL = "mongodb+srv://root:gqLWw1AzUDMjv2RU@cluster0.kh5y6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
const PORT = 5000;

//to access env variables
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true})); //instead of bodyParser use this
app.use(cors())
// route middlewares
app.use('/api/user',userRoute);
// app.use('/api/posts',postRoute);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
>>>>>>> auth

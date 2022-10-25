const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const app = express()
const cors = require('cors');

dotenv.config();
connectDB();
app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.json())

let userRouter =require('./routes/user')
let adminRouter =require('./routes/admin')

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(5000,()=>{   
    console.log("Server Started on port 5000");
})
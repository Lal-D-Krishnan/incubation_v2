const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const app = express()
const cors = require('cors');
const bodyParser = require ('body-parser');
const session = require("express-session");


dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

app.use(session({ secret: "key", cookie: { maxAge: 60000000*24*10000 }, resave: false,saveUninitialized:false }));
app.use(express.json())
app.use(cors());

let userRouter =require('./routes/user')
let adminRouter =require('./routes/admin');



app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(5002,()=>{   
    console.log("Server Started on port 5002");
})

module.exports = app;

const asyncHandler = require("express-async-handler"); // dis
const User = require("../models/userModels"); // take dis
const session = require("express-session");
const generateToken = require("../utils/generateTokens");
const { default: mongoose } = require("mongoose"); // take dis

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exist");
    }

    const user = await User.create( {
      name,
      email,
      mobile,
      password,
      status:true,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: generateToken(user._id),

      });
    } else {
      res.status(400);
      throw new Error("error occured");
    } 
});



const authUser = asyncHandler(async (req, res) => {
    // req.body = JSON.stringify(req.body)
    // console.log(req.body);

    // const { email, password } = req.body;

    const email = req.body.email 
    const password = req.body.password

    console.log("hola" + { email, password});

    const user = await User.findOne({ email });
    console.log("Found the user usingfindOne " + user);
  
    if (user && (await user.matchPassword(password))) {
        console.log(user._id);
    //   req.ses sion.user_id = user._id;
  
      if (!user.status) {
        res.status(500);
        throw new Error("your account is blocked");
      }
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        status: user.status,
        token: generateToken(user._id),
      });

    } else {
      res.status(400);
      throw new Error("Error Occured");
    }
  });


  
  

module.exports = {
    registerUser,
    authUser
}
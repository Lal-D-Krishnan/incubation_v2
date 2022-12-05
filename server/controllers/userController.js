const asyncHandler = require("express-async-handler"); // dis
const User = require("../models/userModels"); // take dis
// const session = require("express-session");
const generateToken = require("../utils/generateTokens");
const { default: mongoose } = require("mongoose"); // take dis
const Application = require("../models/applicationModel");
const Seats = require('../models/seatModel')
const ObjectId = mongoose.Types.ObjectId


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    mobile,
    password,
    status: true,
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

  console.log("hola" + { email, password });

  const user = await User.findOne({ email });
  console.log("Found the user usingfindOne " + user);

  if (user && (await user.matchPassword(password))) {
    console.log(user._id);
    req.session.user_id = user._id;
    console.log('authUser; req.session.user_id ' + req.session.user_id);

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

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.json({ users });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const editUser = asyncHandler(async (req, res) => {
  console.log("9999999999989");
  console.log(req.body._id);
  console.log(req.body.a);
  console.log(JSON.stringify(req.body));
  const { _id, name, email, mobile } = req.body;
  console.log(_id + "09876543werfgh");
  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: {
          name: name,
          email: email,
          mobile: mobile,
        },
      }
    );
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});


const blockUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: { status: false },
      }
    );
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: { status: true },
      }
    );
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.deleteOne({ _id: _id });
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const submitApplication = asyncHandler(async (req, res) => {
  console.log("part1");
  console.log(req.session.user_id);
  console.log('part2');
  req.body.user_id = req.session.user_id;
  console.log(req.body);
  console.log("part3");
  try {
    const userId = req.session.user_id;
    let user = await User.findOne({ _id: userId });

    if (user) {
      let application = await Application.create(req.body);
      application.approval_status = "pending";
      console.log('application creatd successfully');
      res.json(application);
    } else {
      throw new Error("error occured try after some times");
    }
  } catch (e) {
    res.json({ e });
  }
});

const getSubmitStatus = asyncHandler(async (req, res) => {
  try {
    console.log(`Is there id in the session ;getSubmitStatus ${req.session.user_id}`);
    console.log(`Is there id in the params ;getSubmitStatus ${req.params.id}`);
    const application = await Application.findOne({
      user_id: req.params.id,
    });

    res.json(application);
  } catch (e) {
    throw new Error(e);
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    req.session.destroy;
    res.json({ logout: true });
  } catch (e) { }
});

const getApplications = asyncHandler(async (req, res) => {
  try {
    const appData = await Application.find().sort({ createdAt: 1 });

    res.json(appData);
  } catch (e) { }
});

const approveApp = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    if (_id) {
      await Application.updateOne(
        { _id: _id },
        {
          $set: {
            approval_status: "approved",
          },
        }
      );
      res.json({ status: "approved" });
    }
  } catch (e) { }
});


const declineApp = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    if (_id) {
      await Application.updateOne(
        { _id: _id },
        {
          $set: {
            approval_status: "declined",
          },
        }
      );
      res.json({ status: "declined" });
    }
  } catch (e) { }
});

const addSeat = asyncHandler(async (req, res) => {
  try {

     const exist = await Seats.findOne({seat_number: parseInt(req.body.seat_number)})
     console.log("This is exist value" + exist);
     if (!exist  ){
      // res.json({alreadyexist:true})
      const seat = await Seats.create(req.body);
      res.json(seat);
    }
    res.json(null)

  } catch (e) { }
});


const assignSeat = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { company_id, seat_id } = req.body;

  try {
    const companyDetails = await Application.findById({ _id: company_id });
    console.log(companyDetails);

    const data = await Seats.updateOne(
      { _id: seat_id },
      {
        $set: {
          name: companyDetails.company_name,
          email: companyDetails.email,
          user_id: companyDetails._id,
          status: false,
        },
      }
    );
    console.log(data);

    if (data) {
      res.json({ status: true });
    } else {
      throw new Error("error occured");
    }
  } catch (error) {
    console.log(error);
  }
});


const removeCompanyseat = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    const removed = await Seats.updateOne(
      { _id: _id },
      {
        $set: {
          name: null,
          email: null,
          user_id: null,
          status: true,
        },
      }
    );

    if (removed) {
      res.json({ removed: true });
      console.log(removed);
    } else {
      throw new Error("error occured during removal");
    }
  } catch (error) {
    console.log(error);
  }
});

const getSeats = asyncHandler(async (req, res) => {
  try {
    const seats = await Seats.find().sort({ seat_number: 1 });
    console.log("log log");
    console.log(seats);
    console.log("log log");
    res.json(seats);
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
});

const getUserApplications = asyncHandler(async (req, res) => {
  const userId = req.params.id
  console.log("Am I getting the userId in the backend userId" + userId);

  try {
    const appData = await Application.find({ user_id: userId })
    if (appData) {
      res.json(appData)
    }

  } catch (error) {

  }
})

const getRoomData = asyncHandler(async (req, res) => {
  console.log(req.session.user_id);

  try {
    const rooms = await User.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "user_id",
          as: "applications",
        },
      },
      {
        $match: {
          "applications.user_id": ObjectId(req.params.id)

        },
      },
      {
        $unwind: {
          path: "$applications",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "seatings",
          localField: "applications._id",
          foreignField: "user_id",
          as: "rooms",
        },
      },
      {
        $project: {
          rooms: 1,
        },
      },
    ]);
    console.log('rooms[0].rooms1');
    console.log(rooms);
    console.log('rooms[0].rooms2');
    console.log(rooms[0].rooms)
    console.log('rooms[0].rooms3');
    if (rooms) {
      res.json(rooms[0].rooms)
    }



  } catch (error) {
    console.log(error);
  }
});



module.exports = {
  registerUser,
  authUser,
  getAllUser,
  blockUser,
  unBlockUser,
  getUserApplications,
  editUser,
  deleteUser,
  submitApplication,
  getSubmitStatus,
  logout,
  getApplications,
  approveApp,
  declineApp,
  addSeat,
  getSeats,
  assignSeat,
  removeCompanyseat,
  getRoomData
}
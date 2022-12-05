const express = require("express");
const { registerUser, authUser, editUser,getAllUser,blockUser,unBlockUser,deleteUser,getApplications,approveApp,declineApp,addSeat,assignSeat,removeCompanyseat,getSeats,getRoomData } = require("../controllers/userController");
const router = express.Router();



router.get('/usersData',getAllUser )
router.post('/edituser',editUser)

router.patch('/blockUser',blockUser)
router.patch('/unBlockUser',unBlockUser)
router.patch('/deleteUSer',deleteUser)
router.get('/get-applications',getApplications)
router.patch('/approve-app',approveApp)
router.patch('/decline-app',declineApp)
router.get('/get-seats',getSeats)
router.post('/add-seat',addSeat)
router.post('/assign-seat',assignSeat)
router.post('/removecompany',removeCompanyseat)
router.get('/getRoomsData/:id',getRoomData )



module.exports = router;
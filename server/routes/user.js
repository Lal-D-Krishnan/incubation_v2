const express = require("express");
const { registerUser, authUser,submitApplication,getSubmitStatus,getUserApplications,logout } = require("../controllers/userController");
const router = express.Router();



router.post('/signup',registerUser)
router.post('/login',authUser)

router.post("/submit-application",submitApplication)
router.get('/submit-status/:id',getSubmitStatus)
router.get('/applications/:id',getUserApplications)


router.get('/logout',logout)



module.exports = router;
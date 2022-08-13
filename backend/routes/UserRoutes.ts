import * as express from 'express'

const router=express.Router()

const {registerUser,loginUser,logout,updateProfile,updatePassword}=require('../controller/UserController')
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/logout").get(logout);
router.route('/updatepassword').put(updatePassword)
router.route("/updateprofile").put(updateProfile);
module.exports=router;
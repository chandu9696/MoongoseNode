const catchAsync3=require('../middleware/catchAsync')
const User=require('../modal/user.ts')
const ErrorHandler3=require('../utiles/errorHandler.ts')
const sendToken1=require('../utiles/JwtToken')
const cloudinary = require("../utiles/cloudnaryhelp");
exports.registerUser = catchAsync3(async (req:any, res:any, next:any) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
   

   sendToken1(user,200,res)
    // res.status(200).json({
    //     sucess:true,
    //     user,
    //     token
    // })
  });

  exports.loginUser = catchAsync3(async (req:any, res:any, next:any) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler3("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler3("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler3("Invalid email or password", 401));
    }
  
   
    sendToken1(user,200,res)
  });
  exports.logout = catchAsync3(async (req:any, res:any, next:any) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

//   exports.forgotPassword = catchAsync3(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });
  
//     if (!user) {
//       return next(new ErrorHandler("User not found", 404));
//     }
  
//     // Get ResetPassword Token
//     const resetToken = user.getResetPasswordToken();
  
//     await user.save({ validateBeforeSave: false });
  
//     const resetPasswordUrl = `${req.protocol}://${req.get(
//       "host"
//     )}/password/reset/${resetToken}`;
  
//     const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
//     try {
//       await sendEmail({
//         email: user.email,
//         subject: `Ecommerce Password Recovery`,
//         message,
//       });
  
//       res.status(200).json({
//         success: true,
//         message: `Email sent to ${user.email} successfully`,
//       });
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
  
//       await user.save({ validateBeforeSave: false });
  
//       return next(new ErrorHandler(error.message, 500));
//     }
//   });
  
  // Reset Password
//   exports.resetPassword = catchAsync3(async (req, res, next) => {
//     // creating token hash
//     const resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");
  
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });
  
//     if (!user) {
//       return next(
//         new ErrorHandler(
//           "Reset Password Token is invalid or has been expired",
//           400
//         )
//       );
//     }
  
//     if (req.body.password !== req.body.confirmPassword) {
//       return next(new ErrorHandler("Password does not password", 400));
//     }
  
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
  
//     await user.save();
  
//     sendToken(user, 200, res);
//   });


exports.getUserDetails = catchAsync3(async (req:any, res:any, next:any) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // update User password
  exports.updatePassword = catchAsync3(async (req:any, res:any, next:any) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler3("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler3("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken1(user, 200, res);
  });
  
  // update User Profile
  exports.updateProfile = catchAsync3(async (req:any, res:any, next:any) => {
 
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      const newUserData = {
        name: req.body.name,
        email: req.body.email,   
        avatar:{
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        }
        
      };
   
      const user1 = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    }
  
    
  
    res.status(200).json({
      success: true,
    });
  });
  
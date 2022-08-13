const ErrorHandler4=require('../utiles/errorHandler.ts')
const catchAsync4=require('../middleware/catchAsync')
const jwt1 = require("jsonwebtoken");
const User1 = require("../modal/user.ts");

exports.isAuthenticatedUser = catchAsync4(async (req:any, res:any, next:any) => {
  const { token } = req.cookies;

  console.log(token)
  if (!token) {
    return next(new ErrorHandler4("Please Login to access this resource", 401));
  }

  const decodedData = jwt1.verify(token, process.env.JWT_SECRET);

  req.user = await User1.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles:any) => {
    return (req:any, res:any, next:any) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler4(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };
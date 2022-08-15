const sendToken = (user:any, statusCode:any, res:any) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // headers:{
      //   'Access-Control-Allow-Credentials': true
      // }
    };

    res.status(statusCode).header({'Access-Control-Allow-Origin':true}).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };

  module.exports = sendToken;

const ErrorHandler2=require('../utiles/errorHandler.ts')

const error1=(err:any,req:any,res:any,next:any)=>{
  
    err.statusCode=err.statusCode || 500;
    err.message=err.message ||'Internal server error';
   
    if(err.name==='CastError')
    {
        const message='Resource Not Found'+err.path;
        err=new ErrorHandler2(message,400)
    }
    res.status(err.statusCode).json({
        sucess:false,
        message:err.message
    })

}
module.exports=error1;
class ErrorHandler1 extends Error{
    statusCode: number
    constructor(message:any,statusCode:number,)
    {
        super(message)
        this.statusCode=statusCode,
        this.message=message
        console.log('callled')
        // Error.captureStackTrace(this,this.constructor)
    }
}

module.exports=ErrorHandler1

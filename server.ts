import dotenv from 'dotenv';
require('./backend/connectDB')

//Will not appiled on typescript
process.on('uncaughtException',(err:any)=>{
    console.log('err'+err.message)
    console.log('Server shutting down due to unhandled exception')
    process.exit(1)
})
dotenv.config()
const app=require('./backend//moongoseapi.ts')
const server=app.listen(process.env.PORT || 5000,()=>{console.log('running')})

process.on('unhandledRejection',(err:any)=>{
    console.log('err'+err.message)
    console.log('Server shutting down due to unhandled expression')
    server.close(()=>{
        process.exit(1)
    })
})


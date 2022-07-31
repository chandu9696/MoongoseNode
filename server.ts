import dotenv from 'dotenv';
require('./connectDB')
dotenv.config()
const app=require('./moongoseapi.ts')


app.listen(process.env.PORT || 5000,()=>{console.log('running')})

import { AnyCnameRecord } from 'dns';
import dotenv from 'dotenv';

dotenv.config()
const mongoose=require('mongoose')
const url=process.env.MONGODB_URL
mongoose.connect(url).then((data:any)=>{
    console.log('connection created sucessfully'+data.connection.host)
}).catch((err:any)=>{
    console.log(err)
})
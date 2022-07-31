import dotenv from 'dotenv';

dotenv.config()
const mongoose=require('mongoose')
const url=process.env.MONGODB_URL
mongoose.connect(url)
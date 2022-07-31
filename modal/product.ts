const mongoose=require('mongoose')

// dotenv.config()
// const url=process.env.MONGODB_URL

// mongoose.connect(url)
const productScehma=new mongoose.Schema({
        name:String,
        modal:String,
        price:Number,
        category:String
    })

module.exports=mongoose.model('products',productScehma)
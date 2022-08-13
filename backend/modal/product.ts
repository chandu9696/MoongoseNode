const mongoose=require('mongoose')

// dotenv.config()
// const url=process.env.MONGODB_URL

// mongoose.connect(url)
const productScehma=new mongoose.Schema({
        name:{
            type:String,
            required:[true,'please Enter a Name']
        },
        description:{
            type:String,
            required:[true,'please Enter a description']
        },
        price:{
            type:Number,
            required:[true,'please Enter a Price'],
            maxLength:[8,'price cannot be more than 8 charterts']
        },

        rating:{
            type:Number,
            default:0
        },
        images:[
            {
                public_id:{
                    type:String,
                    required:[true,'please provide publick url']
                },
                url:{
                    type:String,
                    required:[true,'please provide publick url']
                }
            }
        ],
        
        category:{
            type:String,
            required:[true,'please provide category']
        },
        stock:{
            type:Number,

            maxLength:[4,'price cannot be more than 8 charterts']

        },
        numofReviews:{
            type:Number,
            default:0
        },
        reviews:[
            {
                name:{type:String,required:true},
                rating:{type:Number,required:true},
                comments:{type:String,required:true}
            
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now
        }
    })

module.exports=mongoose.model('items',productScehma)
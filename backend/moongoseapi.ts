

const express=require('express')
// require('./connectDB')
const cookieparser=require('cookie-parser')

const product=require('./routes/Productroute')
const app=express()
const error=require('./middleware/errorHandle')
app.use(express.json())
app.use(cookieparser())
const user=require('./routes/UserRoutes')
// const {getAllProducts,addProduct,getindProduct,updateProduct,searchProduct}=require('./controller/getAllProducts.ts')
// console.log(getAllProduct.getAllProduct)
// const Product=require('./modal/product.ts')
// const getAllProduct=async(req:any,res:any)=>{

//     console.log(req.body)
//     const result=new Product(req.body)
//     const saved=await result.save()

//     console.log(saved)
//     res.send({sucess:true})
// }
// app.post('/create',addProduct)
// app.get('/getdata',getAllProducts)
// app.get('/getind/:_id',getindProduct)
// app.put('/getind/:_id',updateProduct)
// app.get('/search/:key',searchProduct)
app.use('/api/v1',product)
app.use('/api/v1',user)

app.use(error)
module.exports=app;

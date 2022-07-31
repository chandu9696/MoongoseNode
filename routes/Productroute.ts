import * as express from 'express'
// const express=require('express')
// require('./connectDB')
// const app=express()
const router=express.Router()
// app.use(express.json())
const {getAllProducts,addProduct,getindProduct,updateProduct,searchProduct,deleteProduct}=require('../controller/getAllProducts.ts')
router.route('/create').post(addProduct)
router.route('/getdata').get(getAllProducts)
router.route('/getind/:_id').get(getindProduct)
router.route('/getind/:_id').put(updateProduct)
router.route('/delete/:_id').delete(deleteProduct)
router.route('/search/:key').get(searchProduct)

// app.post('/create',addProduct)
// app.get('/getdata',getAllProducts)
// app.get('/getind/:_id',getindProduct)
// app.put('/getind/:_id',updateProduct)
// app.get('/search/:key',searchProduct)
module.exports=router;
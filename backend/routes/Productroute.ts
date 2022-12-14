import * as express from 'express'
// const express=require('express')
// require('./connectDB')
// const app=express()
const router=express.Router()
// app.use(express.json())
const {addProduct,getAllProducts,updateProduct,deleteProduct,getindProduct}=require('../controller/getAllProducts.ts')
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/auth.ts')

router.route('/product/new').post(addProduct)
router.route('/product').get(getAllProducts)
// router.route('/getind/:_id').get(getindProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getindProduct)
// router.route('/delete/:_id').delete(deleteProduct)
// router.route('/search/:key').get(searchProduct)

// app.post('/create',addProduct)
// app.get('/getdata',getAllProducts)
// app.get('/getind/:_id',getindProduct)
// app.put('/getind/:_id',updateProduct)
// app.get('/search/:key',searchProduct)
module.exports=router;
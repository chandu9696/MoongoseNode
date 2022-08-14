
const Product=require('../modal/product.ts')
const ErrorHandler=require('../utiles/errorHandler.ts')
const ApiFeatures1=require('../utiles/apifeatures.ts')
const catchAsync=require('../middleware/catchAsync')
const cloudinary3 = require("../utiles/cloudnaryhelp");
exports.addProduct=catchAsync(async(req:any,res:any)=>{
    let images:any = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks:any = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary3.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
    const result=new Product(req.body)
    const saved=await result.save()
    res.status(201).json({sucess:true,saved})
})
exports.getAllProducts=async(req:any,res:any,next:any)=>{
    // const countproduct=await Product.countDocuments()
    const apifeatures=new ApiFeatures1(Product.find(),req.query).search().filter().pagination(8)
    const data=await apifeatures.query

    // console.log(saved)
    res.status(200).json({sucess:true,data})}
exports.getindProduct=async(req:any,res:any,next:any)=>{


    const product=await Product.findById(req.params.id)

    // console.log(saved)/
    if(!product)
    {
        return next(new ErrorHandler('Product Not found d',400))
      
    }
     res.status(200).json({sucess:true,product})
}
exports.updateProduct=async(req:any,res:any,next:any)=>{

    console.log(req.body)
    const product=await Product.findById(req.params.id)

    if(!product)
    {
        return next(new ErrorHandler('Product Not found d',400))
    }
    
     const data=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
     res.status(200).json({sucess:true,data})
 }
 exports.deleteProduct=async(req:any,res:any,next:any)=>{

    
    const product=await Product.findById(req.params.id)

    if(!product)
    {
        return next(new ErrorHandler('Product Not found d',400))
    }
    
     const data=await product.remove()
     res.status(200).json({sucess:true,message:"Profile updated sucessfully"})
 }
//  exports.searchProduct=async(req:any,res:any)=>{
//     const data=await Product.find({
//         "$or":[
//             {"name":{$regex:req.params.key}}
//         ]
//     })
//     res.send(data)
// }
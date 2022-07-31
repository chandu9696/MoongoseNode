

const Product=require('../modal/product.ts')
exports.addProduct=async(req:any,res:any)=>{

    console.log(req.body)
    const result=new Product(req.body)
    const saved=await result.save()

    console.log(saved)
    res.send({sucess:true})
}
exports.getAllProducts=async(req:any,res:any)=>{


    const data=await Product.find()

    // console.log(saved)
    res.send(data)
}
exports.getindProduct=async(req:any,res:any)=>{


    console.log(req.params)
    const data=await Product.find(req.params)

    // console.log(saved)
    res.send(data)
}
exports.updateProduct=async(req:any,res:any)=>{

    console.log(req.body)
     const data=await Product.updateOne(req.params,{$set:req.body})
     console.log(data)
     res.send({sucess:true})
 }
 exports.deleteProduct=async(req:any,res:any)=>{

    console.log(req.body)
     const data=await Product.deleteOne(req.params)
     console.log(data)
     res.send({sucess:true})
 }
 exports.searchProduct=async(req:any,res:any)=>{
    const data=await Product.find({
        "$or":[
            {"name":{$regex:req.params.key}}
        ]
    })
    res.send(data)
}
import Products from '../models/product_schema.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import expressAsyncHandler from "express-async-handler";


const createproduct = (req,res)=>{
   const pro = new Products({
      pro_name: req.body.pro_name,
      pro_brand:req.body.pro_brand,
      pro_price:req.body.pro_price,
      pro_image: req.body.pro_image
   });

   pro.save()
   .then(result => {
       console.log('item created')
   })
   .catch( err => {
    console.log(err)
   })
}

const getproducts = async(req,res)=>{
    const pro = await Products.find({}).sort({createdAt:-1})
    console.log(req.body)
    res.status(200).json(pro)
}

const updateproducts = async(req,res)=>{
    const { id }= req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'this product does not exit'})
    }

    const pro = await Products.findByIdAndUpdate({_id: id},{...req.body})

     
    if(!pro)
    {
        return res.status(404).json({error: error.message})
    }

    res.status(200).json(pro)
}

const deleteporduct = async (req,res)=>{
    const { id }= req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'this product does not exit'})
    }

    const pro = await Products.findByIdAndDelete({_id: id})

    if(!pro)
    {
        return res.status(404).json({error: error.message})
    }

    res.status(200).json(pro)
}

const exportpro = {
   createproduct,
   getproducts,
   updateproducts,
   deleteporduct
}

export default exportpro
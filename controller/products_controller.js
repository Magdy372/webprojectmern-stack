import Products from '../models/product_schema.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import expressAsyncHandler from "express-async-handler";


const createproduct = (req,res)=>{
  /* const pro = new Products({
      name: req.body.title,
      brand:req.body.brand,
      price:req.body.price,
      image: req.body.image,
      descrption: req.body.descrption,
      category:req.body.category
   });

   pro.save()
   .then(result => {
       console.log(req.body)
       console.log('item created')
   })
   .catch( err => {
    console.log(err)
   })

*/
/*console.log(req.body);*/

 
const pro = new Products({
    title: req.body.title,
    brand:req.body.brand,
    price: req.body.Price,
    image: req.body.img ,
    descrption: req.body.description,
    category:req.body.category
 });
  console.log(pro);


    pro.save()
    .then(result => {
    res.redirect('/dashborad');
    
    })
    .catch(err => {
    console.log(err);
    });










}

/*const getproducts = async(req,res)=>{
    const pro = await Products.find({}).sort({createdAt:-1})
    console.log(req.body)
    res.status(200).json(pro)
}*/

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
   //getproducts,
   updateproducts,
   deleteporduct
}

export default exportpro
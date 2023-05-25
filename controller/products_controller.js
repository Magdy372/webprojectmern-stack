import Products from '../models/product_schema.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import expressAsyncHandler from "express-async-handler";
import path from 'path';
import expressfileUpload from 'express-fileupload';
import express from 'express';
import router from '../routes/cart.js';
import { __filename } from '../app.js';
import { __dirname } from '../app.js';




const createproduct = (req, res) => {
    let imgFile;
    let uploadPath;
    console.log(__dirname + '/public/images/');
    console.log(req.files);
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    imgFile = req.files && req.files.image;
    uploadPath = __dirname + '/public/images/' +  req.body.title + path.extname(imgFile.name)
    console.log(uploadPath)
    console.log(req.body)
    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      const pro = new Products({
        title: req.body.title,
        brand: req.body.brand,
        Price: req.body.Price, // corrected 'Price' to 'price'
        image: req.body.title + path.extname(imgFile.name),
        description: req.body.description, // corrected 'descrption' to 'description'
        category: req.body.category
      });
  
      console.log(pro);
      
      pro.save()
        .then(result => {
          res.redirect('/inventory');
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  

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
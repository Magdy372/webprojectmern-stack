import mongoose from "mongoose";
const schema = mongoose.Schema;

const product_schema =   new schema({

    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
       type:String,
       required:true
    },
    descrption:{
        type:String,
        required:true
    },

}, { timestamps: true });


const product = mongoose.model("products",product_schema);
//module.exports= product;

export default product
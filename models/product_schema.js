import mongoose from "mongoose";
const schema = mongoose.Schema;

const product_schema =   new schema({

    pro_name:{
        type:String,
        required:true
    },
    pro_price:{
        type:Number,
        required:true
    },
    pro_brand:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    pro_image:{
       data:Buffer,
       contentType:String
    }

}, { timestamps: true });


const product = mongoose.model("products",product_schema);
 

export default product
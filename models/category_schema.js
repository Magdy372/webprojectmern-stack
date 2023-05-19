import mongoose from "mongoose";
const schema = mongoose.Schema;


const category_Schema = new schema({
    category_name:{
        type:String,
        required:true
    },

    category_type:{
        type:String,
        required:true
    }

}, { timestamps: true })


const category = mongoose.model("categorys",category_Schema);
 

export default category 
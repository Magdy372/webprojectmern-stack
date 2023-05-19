import mongoose from "mongoose"
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const SignupSchema = new Schema({
  fullname:{ 
    type:String,
    required: true          
  },
  mail:{ 
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },
  cpassword: {
    type:String,
    required: true
  }
  ,
  Age: {
    type:String,
    required:true
  },
  gender: {
    type:String,
    required: true
  },

  Type: {
    type: String,
    required: true
  },

  cart:{
    item:[{product_id:{
      type:String
    }}]
  },
  wishlist:{
    item:[{product_id:{
      type:String
    }}]
  },
  orderlist:{
    item:[{order_id:{
      type:String
    }}]
  }

}, { timestamps: true });

 
 
// Create a model based on that schema
const Signup = mongoose.model("Signup",SignupSchema);
 
// export the model
//module.exports=Signup
export default Signup
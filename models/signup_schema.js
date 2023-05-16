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
  }

});
 
 
// Create a model based on that schema
const Signup = mongoose.model("Signup",SignupSchema);
 
// export the model
//module.exports=Signup
export default Signup;
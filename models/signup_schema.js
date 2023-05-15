import mongoose from "mongoose"
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const SignupSchema = new Schema({
  fullname: String,
  mail: String,
  password: String,
  cpassword: String,
  Age: String,
  gender: String,

});
 
 
// Create a model based on that schema
const Signup = mongoose.model("Signup",SignupSchema);
 
// export the model
//module.exports=Signup
export default Signup;
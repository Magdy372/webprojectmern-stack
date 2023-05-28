import Signup from "../models/signup_schema.js"
import bcrypt from 'bcrypt';

const signupform = async (req,res)=>{
  //const signup =new Signup(req.body)
    
  const password = req.body.password;
  const cpassword=req.body.cpassword;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedcPassword = bcrypt.hashSync(cpassword, 10);

    const sign = new Signup ({
        fullname: req.body.fullname,
        mail: req.body.mail,
        password: hashedPassword,
        cpassword: hashedcPassword,
        Age: req.body.Age,
        gender: req.body.gender,
        Type:req.body.Type,
      });

      console.log(req.body)
   sign.save()
    .then( result => {
        res.redirect("/")
    })
    .catch( err => {
        console.log(err)
    })
}


export default signupform
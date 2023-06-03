import Signup from "../models/signup_schema.js";

import bcrypt from 'bcrypt';

function validateSignup(){
    let fail=false;
  
    if (!/\S+@\S+\.\S+/.test(req.body.mail)){
      fail=true;
    }
  
    if (req.body.password.length < 8) {
      
      fail=true;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(req.body.password)) {
      fail=true;
  
    }
  
    if (req.body.password !== req.body.cpassword) {
      fail=true;
      
    }
  
    if(fail===true){
      console.log("there is error in password or email");
      return false;
    }
    else{
  return true;
    }
  }

const  adduserform= async (req,res)=>{
  //const signup =new Signup(req.body)
    
      const saltRounds = 10;
      const password = req.body.password;
      const cpassword=req.body.cpassword;
    
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const hashedcPassword = await bcrypt.hash(cpassword, saltRounds);

      if(validateSignup){
    const sign = new Signup ({
      
        fullname: req.body.fullname,
        mail: req.body.mail,
        password: hashedPassword,
        cpassword: hashedcPassword,
        Age: req.body.Age,
        gender: req.body.gender,
        Type:req.body.type,
      });

      console.log(req.body)
   await sign.save()
    .then( result => {
        res.redirect("/dashborad")
    })
    .catch( err => {
        console.log(err)
    })
}
}

const checkUN = (req, res) => {
    var query = { mail: req.body.mail};
    Signup.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
};
const exportsign = {
    checkUN,
    adduserform
 }
 

export default exportsign
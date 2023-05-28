import signup from "../models/signup_schema.js"

const  adduserform= async (req,res)=>{
  //const signup =new Signup(req.body)
    

    const sign = new signup ({
        fullname: req.body.fullname,
        mail: req.body.mail,
        password: req.body.password,
        cpassword: req.body.cpassword,
        Age: req.body.Age,
        gender: req.body.gender,
        Type:req.body.type,
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


export default adduserform
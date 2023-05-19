import Signup from "../models/signup_schema.js"

const signupform = (req,res,next)=>{
    const user = new Signup ({
         fullname: req.body.fullname,
         mail: req.body.mail,
         password: req.body.password,
         cpassword: req.body.cpassword,
         Age: req.body.Age,
         gender: req.body.gender
    })
    user.save()
    console.log(user)
    .then(result => {
        
        //.redirect("/")
    })
    .catch( err => {
        console.log(err)
    })
}


export default signupform
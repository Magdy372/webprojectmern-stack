import Signup from "../models/signup_schema.js"

const signupform = async (req,res)=>{
    const signup =new Signup(req.body)
    console.log(req.body)


   signup.save()
    .then( result => {
        res.redirect("/")
    })
    .catch( err => {
        console.log(err)
    })
}


export default signupform
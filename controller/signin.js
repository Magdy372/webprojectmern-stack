import Signup from "../models/signup_schema.js"
import bcrypt from 'bcrypt';
import expressAsyncHandler from "express-async-handler";


const signinform = (req, res) => {


  var query = { mail: req.body.mail,password: req.body.password };
  Signup.find(query)
    .then(result => {
      if (result.length > 0) {
        console.log(result[0]);
          req.session.user = result[0];
          //, { user: (req.session.user === undefined ? "" : req.session.user) }
          if(req.session.user.Type==='admin'){
            res.redirect('/dashborad')
          }
          else{
          res.redirect('/');
          }
      }
      else {
        res.send('invalid data')
      }
    })
    .catch(err => {
      console.log(err);
    });

  




/*    const  email = req.params.mail;
    const password = req.params.password;
    
     //const  password=req.params.password;
    try {
      // Find the user by email
      const user = await Signup.findOne({ email });
  
      if (!user) {
        // User not found
        return res.status(401).json({ message: 'Invalid email' });
      }
  
       //Compare the provided password with the stored hash
    //const isPasswordValid = await user.comparePassword(password);

     // Assuming you're getting the password from the request body
const hashedPassword = user.password; // Assuming you have retrieved the hashed password from the database
//const string = password.toString();
//const password1 = password.toString();
//const number = hashedPassword.toString();
//const Matched = bcrypt.compareSync(password, number);
  
      if (!(bcrypt.compareSync(password, hashedPassword))) {
        // Incorrect password
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Authentication successful
      //res.status(200).json({ message: 'Sign-in successful' });
      res.redirect("/")
    } catch (error) {
      console.error(error);
      //res.status(500).json({ message: 'Server error' });
    }   */





  }
  const getalluser = async (req,res)=>
  {
    Signup.find({}, (err, users) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json(users);
      }
    });
  }
 
  const exportuser = {
    signinform,
    getalluser
  }
  export default exportuser
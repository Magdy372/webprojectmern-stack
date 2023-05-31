import Signup from "../models/signup_schema.js"
import bcrypt from 'bcrypt';



const checkusersssdata = (req, res) => {

 // const password= req.body.password;
  var query = { mail: req.body.mail };
  Signup.find(query)
    .then(result => {
      if (result.length > 0) {
        const password= req.body.password;
        const storedHashedPassword = result[0].password; 
        //req.session.check=result[0];
        const data=result[0];

        if ( bcrypt.compareSync(password, storedHashedPassword)) {

          console.log(result[0]);
         // req.session.user = result[0];
         //, { user: (req.session.user === undefined ? "" : req.session.user) }

         
           // res.render('/eitUseradmin',data);
          
       // res.render("editUseradmin",{data});
                          return true;
        }
        else{
          res.send('invalid password')
        }

        
      }
      else {
        res.send('invalid email')
      }
    })
    .catch(err => {
      console.log(err);
    });







  }
  
  export default checkusersssdata
    
  
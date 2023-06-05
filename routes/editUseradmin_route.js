import { Router } from 'express';
import  checkusersssdata  from '../controller/checkusersssdata.js'
import Signup from "../models/signup_schema.js"
import bcrypt from 'bcrypt';

var router = Router();


/* GET /about page. */


router.post("/",function(req, res, next){
  
  var query = { mail: req.body.mail };
  Signup.find(query)
    .then(result => {
      if (req.session && req.session.user && req.session.user.Type === 'admin') {
      if (result.length > 0) {
       
        //req.session.check=result[0];
        const data=result[0];

      

          console.log(result[0]);
         // req.session.user = result[0];
         //, { user: (req.session.user === undefined ? "" : req.session.user) }

         
           // res.render('/eitUseradmin',data);
          
        res.render("editUseradmin",{data});
                         // return true;
        

        
      }
      else {
        res.send('invalid email')
      }
    }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
    })
    .catch(err => {
      console.log(err);
    });

});

/*router.post('/', function(req, res, next) {
    res.render("editUseradmin");
});*/

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
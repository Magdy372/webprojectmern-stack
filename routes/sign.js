import { Router } from 'express';
import Order from '../models/order.js';
import user1 from '../models/signup_schema.js'
import bcrypt from 'bcrypt';
var router = Router();

/* GET /about page. */
router.get('/sign', function(req, res, next) {
  if (!req.session || req.session.user === undefined ) {
    res.render("sign",{ user: (req.session.user === undefined ? "" : req.session.user) });
  }  
      else if ( req.session.user.Type === 'user'){
        Order.find({customer:req.session.user._id})
        .then(result=>{
          res.render("sign",{ order:result,user: (req.session.user === undefined ? "" : req.session.user) });
        })
      }
  
});


router.post('/sign/forgetpw', function(req, res, next) {
  console.log(req.body.mail1);
  const email=req.body.mail1;
  console.log(email);
  user1.findOne({ mail: req.body.mail1 })
    .then(result => {
      
      console.log(result);
      res.render('forgetpw',{reset:result,user: (req.session.user === undefined ? "" : req.session.user)})
   
     
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('This email is not in our system');
    });
});


router.post('/sign/update/:id',  function(req, res, next) {
  const saltRounds = 10;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  console.log(req.body.password);
  console.log(req.body.cpassword);
  
  bcrypt.hash(password, saltRounds)
    .then(hashedPassword => {
      bcrypt.hash(cpassword, saltRounds)
        .then(hashedcPassword => {
          user1.findByIdAndUpdate(req.params.id, { password: hashedPassword, cpassword: hashedcPassword })
            .then(result => {
              res.redirect('/sign');
            })
            .catch(err => {
              console.error('Error:', err);
              res.status(500).send('An error occurred');
            });
        });
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('An error occurred');
    });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

//router.post("/",signupform )

export default router;
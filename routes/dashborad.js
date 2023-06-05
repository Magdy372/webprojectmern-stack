import { Router } from 'express';
import signin from '../models/signup_schema.js'
import product1 from '../models/product_schema.js'

var router = Router();


/* GET /about page. */
router.get('/', function(req, res, next) {
  
  product1.find()
  .then(result1 => {
    // Handle the first query result here
    signin.find()
      .then(result2 => {
        // Handle the second query result here
        console.log(result2);
        console.log(result1);
        res.render("dashborad", {
          product: result1,
          user1: result2 ,
          user: (req.session.user === undefined ? "" : req.session.user)
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });

  // signin.find()
  //   .then(result => {
  //     if (req.session && req.session.user && req.session.user.Type === 'admin')
  //     {
  //   res.render("dashborad",{user: result , User: (req.session.user === undefined ? "" : req.session.user) });
  //     }
  //     else{
  //       res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  //     }
  //   })
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
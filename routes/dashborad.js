import { Router } from 'express';
import signin from '../models/signup_schema.js'
import product1 from '../models/product_schema.js'
import order from '../models/order.js'
import news from '../models/newselter.js'


var router = Router();


/* GET /about page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.user && req.session.user.Type === 'admin') {
  product1.find()
  .then(result1 => {
    // Handle the first query result here
    signin.find()
      .then(result2 => {  

        order.find()
        .then(result3=>{

          news.find()
          .then(result4=>{
            
          res.render("dashborad", {
            product: result1,
            user1: result2 ,
            order:result3,
            newss:result4,
            user: (req.session.user === undefined ? "" : req.session.user)
          });

          })
          .catch();
          

        })
        .catch(err => {
          console.log(err);
        });
        // Handle the second query result here
        
      })
      .catch(err => {
        console.log(err);
      });
   
  })
  .catch(err => {
    console.log(err);
  });
   }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
   }

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
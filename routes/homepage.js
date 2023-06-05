import { Router } from 'express';
import product11 from '../models/product_schema.js'
import product12 from '../models/product_schema.js'
import session from 'express-session';
import signin from '../models/signup_schema.js'
var router = Router();


/* GET /about page. */
// router.get('/', function(req, res, next) {
//     /*req.session.Email = req.query.email;
//     req.session.psw = req.query.psw;
//     req.session.x = 'x';*/
//     
// });
// */
router.get('/homepage', function(req, res, next) {
  /*req.session.Email = req.query.email;
  req.session.psw = req.query.psw;
  req.session.x = 'x';*/

  //signin.find()
  
  if (!req.session || req.session.user === undefined || req.session.user.Type === 'user') {
    res.render("homepage", { User: (req.session.user === undefined ? "" : req.session.user) });
  } else {
    res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
  }
  


 // res.render("homepage", { user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get('/', function(req, res, next) {
/*
  current_date = datetime.datetime.now()
  threshold_date = current_date - datetime.timedelta(days=2)
  query = {"arrivalDate": {"$gte": threshold_date}}
*/

if (!req.session || req.session.user === undefined || req.session.user.Type === 'user') {
const currentDate = new Date();
  const thresholdDate = new Date(currentDate.getTime() - (30* 24 * 60 * 60 * 1000));
  const query = { createdAt: { $gte: thresholdDate },  hasoffer:  "false"  };
  const query1={ hasoffer:  "false" } ;


  product11.find(query1)
  .then(result1 => {
    // Handle the first query result here
    product12.find(query)
     .sort({_id:-1})
     .limit(3)
      .then(result2 => {
        // Handle the second query result here
        console.log(result2);
        res.render("homepage", {
          product1: result1,
          product2: result2,
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
}
else{
  res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
}

});


  //res.render("homepage",/*{product: result}*/ { user: (req.session.user === undefined ? "" : req.session.user) });
  /*
    product11.find()
   .then( result=> { res.render("homepage",{ product: result , user: (req.session.user === undefined ? "" : req.session.user) });})
   .catch((err)=> { console.log(err)});*/
   

   /*router.post('/',function(req, res, next) {
    console.log("ahmmeddddddddddd")
    res.render("homepage", { user: (req.session.user === undefined ? "" : req.session.user) });
  });*/

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
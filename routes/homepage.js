import { Router } from 'express';
import product11 from '../models/product_schema.js'
import session from 'express-session';
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
  res.render("homepage", { user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get('/', function(req, res, next) {
  //res.render("homepage",/*{product: result}*/ { user: (req.session.user === undefined ? "" : req.session.user) });
  
    product11.find()
   .then( result=> { res.render("homepage",{ product: result , user: (req.session.user === undefined ? "" : req.session.user) });})
   .catch((err)=> { console.log(err)});
   
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
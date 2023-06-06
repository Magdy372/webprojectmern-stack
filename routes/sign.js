import { Router } from 'express';
import Order from '../models/order.js';
import session from 'express-session';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
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


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

//router.post("/",signupform )

export default router;
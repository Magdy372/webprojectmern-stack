import { Router } from 'express';
import product11 from '../models/product_schema.js';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
  const arr=req.session.user.cart;


  product11.find({ _id: { $in: arr } })
  .then( result=> { console.log(result); res.render("cart",{ product: result , user: (req.session.user === undefined ? "" : req.session.user) });})
  .catch((err)=> { console.log(err)});
  

    
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
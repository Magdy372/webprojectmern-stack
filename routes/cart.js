import { Router } from 'express';
import product11 from '../models/product_schema.js';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
  console.log("a7aaaaaaaaaaaaaaaa"); 
  console.log(req.session.user.cart[0]) ;
  const arr=req.session.user.cart;


  product11.find({ _id: { $in: arr } })
  .then( result=> { console.log(result); res.render("cart",{ product: result , user: (req.session.user === undefined ? "" : req.session.user) });})
  .catch((err)=> { console.log(err)});
  

    
});

router.get('/cart', function(req, res, next) {

  console.log("a7aaaaaaaa111111aaaaaaa");
    res.render("/cart",{ user: (req.session.user === undefined ? "" : req.session.user) });
});
/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
import { Router } from 'express';
import product from '../controller/products_controller.js';
import product1 from '../models/product_schema.js'
import product2 from '../models/product_schema.js'
var router = Router();


/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("item",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

// router.get("/item/:id", function(req, res, next) {
//   product1.findById(req.params.id)
//   .then(result=>{
//     res.render("item" ,{ item: result ,user: (req.session.user === undefined ? "" : req.session.user) });
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
 
// });

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
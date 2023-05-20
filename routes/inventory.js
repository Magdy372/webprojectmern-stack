import { Router } from 'express';
import product from '../controller/products_controller.js';
import product1 from '../models/product_schema.js'
var router = Router();



/* GET /about page. */

router.get('/', function(req, res, next) {
    

    product1.find()
    .then((result)=> { res.render("inventory" ,{product: result});})
    .catch((err)=> { console.log(err)});

   
});






/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
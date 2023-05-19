import { Router } from 'express';
import product from '../controller/products_controller.js';
var router = Router();

/* GET /about page. */
router.get('/',product.getproducts, function(req, res, next) {
    res.render("inventory");
});


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
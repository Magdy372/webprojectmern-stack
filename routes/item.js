import { Router } from 'express';
import product from '../controller/products_controller.js';
import product1 from '../models/product_schema.js'
import product2 from '../models/product_schema.js'
var router = Router();


/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("item",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
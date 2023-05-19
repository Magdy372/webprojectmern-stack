import { Router } from 'express';
import product from '../controller/products_controller.js';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("ADMIN-ADD");
});

router.post('/',product.createproduct)

router.patch('/:id',product.updateproducts)

router.delete('/:id',product.deleteporduct)

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
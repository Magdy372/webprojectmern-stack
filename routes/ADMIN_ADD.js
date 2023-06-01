import { Router } from 'express';
import product from '../controller/products_controller.js';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
  if(req.session.user.Type==='admin')
  {
    res.render("ADMIN-ADD",{ user: (req.session.user === undefined ? "" : req.session.user) });
  }
  else{
    res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
});

router.post('/',product.createproduct)


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
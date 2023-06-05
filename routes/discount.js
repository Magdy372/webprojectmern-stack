import { Router } from 'express';
import product1 from '../models/product_schema.js';
var router = Router();

router.get('/', (req, res) => {
  if (req.session && req.session.user && req.session.user.Type === 'admin'){
  product1.find({ hasoffer: { $in: "true" } })
    .then((results) => {
    res.render('discount', { product1: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
   .catch((err) => {
   console.log(err);
});
  }
  else{
    res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
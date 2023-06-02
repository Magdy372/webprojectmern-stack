import { Router } from 'express';
import session from 'express-session';
import product1 from '../models/product_schema.js';
var router = Router();

/* GET /about page. */
router.get('/labtops', (req, res) => {
  product1.find({ category: { $in: "laptop" } })
    .then((results) => {
    res.render('labtops', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
   .catch((err) => {
   console.log(err);
});
});

router.post('/labtops/filter', (req, res) => {
  const brand = req.body.brand;
  product1.find({ category: 'laptop', brand: brand })
    .then((results) => {
      res.render('labtops', { product: results, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
    });
});


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
import { Router } from 'express';
import session from 'express-session';
import product1 from '../models/product_schema.js';
var router = Router();

/* GET /about page. */
router.get('/smartphones', (req, res) => {
  product1.find({ category: { $in: "smartphone" } })
    .then((results) => {
    res.render('smartphones', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
   .catch((err) => {
   console.log(err);
});
});

router.post('/smartphones/filter', (req, res) => {
  const brand = req.body.brand;
  console.log(brand);
  if(brand==="All"){
    product1.find({ category: { $in: "smartphone" } })
    .then((results) => {
    res.render('smartphones', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
   .catch((err) => {
   console.log(err);
    });
  }else{

    product1.find({ category: 'smartphone', brand: brand })
    .then((results) => {
      res.render('smartphones', { product: results, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
});


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
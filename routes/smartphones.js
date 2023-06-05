import { Router } from 'express';
import session from 'express-session';
import product1 from '../models/product_schema.js';
var router = Router();

/* GET /about page. */
router.get('/smartphones', (req, res) => {
  if (!req.session || req.session.user === undefined || req.session.user.Type === 'user'){
  product1.find({ category: { $in: "smartphone" } })
    .then((results) => {
    res.render('smartphones', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
   .catch((err) => {
   console.log(err);
});
  }
  else {
    res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
  }
});

router.post('/smartphones/filter', (req, res) => {
  if (!req.session || req.session.user === undefined || req.session.user.Type === 'user'){
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

    product1.find({ category: 'smartphone',  brand: { $regex: new RegExp(brand, "i") } })
    .then((results) => {
      res.render('smartphones', { product: results, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
else {
  res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
}
});


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
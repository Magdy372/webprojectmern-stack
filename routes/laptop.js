import { Router } from 'express';
import session from 'express-session';
import product1 from '../models/product_schema.js';
var router = Router();

/* GET /about page. */
router.get('/labtops', (req, res) => {
  const page = req.query.page || 1;  // Default to page 1
  const perPage = 10;               // 10 products per page
  
  product1.find({ category: { $in: "laptop" } })
    .skip((page - 1) * perPage)    // Skip products for previous pages
    .limit(perPage)                // Limit to 10 products for this page
    .then(results => {
      const totalProducts = product1.total;  // Get total product count
      const totalPages = Math.ceil(totalProducts / perPage); 
      res.render('labtops', { 
        product: results,
        pagination: {
          currentPage: page,
          totalPages,
          perPage
        },
        user: (req.session.user === undefined ? "" : req.session.user)  
      });
    })
    // ...
}); 

router.post('/labtops/filter', (req, res) => {
  if (!req.session || req.session.user === undefined || req.session.user.Type === 'user'){
  const brand = req.body.brand;
  console.log(brand);
  if(brand==="All"){
    product1.find({ category: { $in: "laptop" } })
    .then((results) => {
    res.render('labtops', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
   .catch((err) => {
   console.log(err);
    });
  }else{

    product1.find({ category: 'laptop', brand: { $regex: new RegExp(brand, "i") }})
    .then((results) => {
      res.render('labtops', { product: results, user: (req.session.user === undefined ? "" : req.session.user) });
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
import { Router } from 'express';
import product1 from '../models/product_schema.js'
import product2 from '../models/product_schema.js'
import { __dirname } from '../app.js';
import fs from 'fs'
import path from 'path';
var router = Router();



/* GET /about page. */

router.get('/offers', function(req, res, next) {
    product1.find({hasoffer:"true"})
    .then((result) => {
      if (req.session && req.session.user && req.session.user.Type === 'admin') {
        res.render('offers', { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
      } else {
        res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/offers/:id",function(req,res,next){
  product1.findByIdAndUpdate(req.params.id,{hasoffer: false})
      .then(result=>{
        if (req.session && req.session.user && req.session.user.Type === 'admin') {
          const userQuery = encodeURIComponent(JSON.stringify(req.session.user));
          res.redirect(`/offers?user=${userQuery}`);
    }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
    })
      .catch((err)=>{
        console.log(err);
      });
})  


router.post('/offers/filter', (req, res) => {
  const category = req.body.category;
  const brand = req.body.brand;

  let query = {};

  if (category !== 'All' && brand !== 'All') {
    query = { category: category, brand: { $regex: new RegExp(brand, "i") } ,hasoffer:"true"};
  } else if (category !== 'All') {
    query = { category: category ,hasoffer:"true"};
  } else if (brand !== 'All') {
    query = { brand: { $regex: new RegExp(brand, "i") } ,hasoffer:"true"};
  }

  Promise.all([
    product1.find(query),
    product2.find(query)
  ])
    .then(([result1, result2]) => {
      res.render('offers', { product: result1, product1: result2, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});



/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
import { Router } from 'express';
import product1 from "../models/product_schema.js"
import product2 from "../models/product_schema.js"


var router = Router();

/* GET /about page. */

router.get('/', function(req, res, next) {

  var query = { category: "laptop" };
  var query1 = { category: "smartphone" };

  Promise.all([
    product1.find(query),
    product2.find(query1)
  ])
    .then(([result1, result2]) => {
      if (req.session && req.session.user && req.session.user.Type === 'admin') {
      res.render("addoffer", { product: result1, product1: result2 , user: (req.session.user === undefined ? "" : req.session.user) });
    }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
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
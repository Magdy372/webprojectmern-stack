import { Router } from 'express';
import product from '../controller/products_controller.js';
import product1 from '../models/product_schema.js'
import product2 from '../models/product_schema.js'
var router = Router();



/* GET /about page. */

router.get('/', function(req, res, next) {
    

  // var query= {category: "laptop"}
  // var query1={category : "smartphone"}
  
  // product1.find(query)
  // .then((result)=> { res.render("inventory" ,{product: result});})
  // .catch((err)=> { console.log(err)});
  
  
  // product2.find(query1)
  // .then((result)=> { res.render("inventory" ,{product1: result});})
  // .catch((err)=> { console.log(err)});
  

  var query = { category: "laptop" };
  var query1 = { category: "smartphone" };

  Promise.all([
    product1.find(query),
    product2.find(query1)
  ])
    .then(([result1, result2]) => {
      res.render("inventory", { product: result1, product1: result2 });
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
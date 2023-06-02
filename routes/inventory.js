import { Router } from 'express';
import product1 from '../models/product_schema.js'
import product2 from '../models/product_schema.js'
import { __dirname } from '../app.js';
import fs from 'fs'
import path from 'path';
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
      if (req.session && req.session.user && req.session.user.Type === 'admin') {
      res.render("inventory", { product: result1, product1: result2 , user: (req.session.user === undefined ? "" : req.session.user) });
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

router.get("/Inventory/:id",function(req,res,next){
  product1.findByIdAndDelete(req.params.id)
      .then(result=>{
        if (req.session && req.session.user && req.session.user.Type === 'admin') {
        const imagePath = path.join(__dirname, '/public/images/', result.image);
        console.log(imagePath)
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          } else {
            console.log('Image deleted:', imagePath);
          }
        console.log(req.params.id);
        console.log(result);
       res.redirect("/Inventory",{ user: (req.session.user === undefined ? "" : req.session.user) })
      })
    }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
    })
      .catch((err)=>{
        console.log(err);
      });
})  





/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
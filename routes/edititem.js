import { Router } from 'express';
import session from 'express-session';
import product1 from '../models/product_schema.js'
var router = Router();


/* GET /about page. */
router.get('/edititem/:id', function(req, res, next) {
    product1.findById(req.params.id)
    .then(result=>{
      console.log(req.params.id);
      console.log(result);
      res.render("edititem",{item: result});
    })
    .catch((err)=>{
      console.log(err);
    });
    
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
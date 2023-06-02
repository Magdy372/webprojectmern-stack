import { Router } from 'express';
import product11 from '../models/product_schema.js';
import user1 from '../models/signup_schema.js'
var router = Router();

/* GET /about page. */
router.get('/cart', function(req, res, next) {
  const arr=req.session.user.cart;


  product11.find({ _id: { $in: arr } })
  .then( result=> { console.log(result); res.render("cart",{ product: result , user: (req.session.user === undefined ? "" : req.session.user) });})
  .catch((err)=> { console.log(err)});
  

    
});

router.get("/cart/:id",function(req,res,next){

  const id1= req.session.user._id;
  const itemId = req.params.id;

  const newcart= req.session.user.cart;
  const id2={_id:id1};

  var index = newcart.indexOf(itemId);
  if (index > -1) {
    newcart.splice(index, 1);
  }

  console.log(newcart);

    
  user1
  .updateOne( id2 , {cart: newcart })
  .then( result => {
    console.log(id1);
      res.redirect("/cart")
  })
  .catch( err => {
      console.log(err)
  })
}) 
router.get("/add/:id",function(req, res, next) {
  
   
  const id1= req.session.user._id;
  const itemId = req.params.id;
 
  console.log(itemId);

 console.log(req.session.user.cart);

 

  let ishere=false;
  const newcart= req.session.user.cart;
  const id2={_id:id1};
  console.log(id1);
  console.log("------");
  
  
   if(newcart.includes(itemId)){
     ishere=false;
     console.log("the product already in the cart");
     res.redirect("/");
     
   }
   else{
     ishere=true;
   }
  
   
  if(ishere){    
     req.session.user.cart.push(itemId);
       
     user1
     .updateOne( id2 , {cart: newcart })
     .then( result => {
       
       console.log(id1);
         res.redirect("/cart")
     })
     .catch( err => {
         console.log(err)
     })
       
  }
    
    //("/");
});

router.get("/cart/addcart/:id",function(req, res, next) {
  
   
  const id1= req.session.user._id;
  const itemId = req.params.id;
 
  console.log(itemId);

 console.log(req.session.user.cart);

 

  let ishere=false;
  const newcart= req.session.user.cart;
  const id2={_id:id1};
  console.log(id1);
  console.log("------");
  
  
   if(newcart.includes(itemId)){
     ishere=false;
     console.log("the product already in the cart");
     res.redirect("/");
     
   }
   else{
     ishere=true;
   }
  
   
  if(ishere){    
     req.session.user.cart.push(itemId);
       
     user1
     .updateOne( id2 , {cart: newcart })
     .then( result => {
       
       console.log(id1);
         res.redirect("/")
     })
     .catch( err => {
         console.log(err)
     })
       
  }
    
    //("/");
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
import { Router } from 'express';
import product11 from '../models/product_schema.js';
import user1 from '../models/signup_schema.js';
var router = Router();

/* GET /about page. */
router.get('/wishlist', function(req, res, next) {
  if ( !req.session || req.session.user === undefined || req.session.user.Type === 'user'){

  const arr=req.session.user.wishlist;


  product11.find({ _id: { $in: arr } })
  .then( result=> { console.log(result); res.render("wishlist",{ product: result , user: (req.session.user === undefined ? "" : req.session.user) });})
  .catch((err)=> { console.log(err)});
  
  }
  else {
    res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
  }

    
});

router.get("/wishlist/addwish/:id",function(req, res, next) {
  if ( !req.session || req.session.user === undefined || req.session.user.Type === 'user'){
  
  const id1= req.session.user._id;
   const itemId = req.params.id;
  
   console.log(itemId);

  console.log(req.session.user.wishlist);

  

   let ishere=false;
   const newwishlist= req.session.user.wishlist;
   const id2={_id:id1};
   console.log(id1);
   console.log("------");
   
   
    if(newwishlist.includes(itemId)){
      ishere=false;
      console.log("the product already in the wishlist");
      res.redirect("/");
      
    }
    else{
      ishere=true;
    }
   
    
   if(ishere){    
      req.session.user.wishlist.push(itemId);
        
      user1
      .updateOne( id2 , {wishlist: newwishlist })
      .then( result => {
        
        console.log(id1);
          res.redirect("/")
      })
      .catch( err => {
          console.log(err)
      })
        
   }
   
   
   //("/");
  }
  else {
    res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
  }
});



router.get("/wishlist/:id",function(req,res,next){

  if ( !req.session || req.session.user === undefined || req.session.user.Type === 'user'){
  const id1= req.session.user._id;
  const itemId = req.params.id;

  const newcart= req.session.user.wishlist;
  const id2={_id:id1};

  var index = newcart.indexOf(itemId);
  if (index > -1) {
    newcart.splice(index, 1);
  }

  console.log(newcart);

    
  user1
  .updateOne( id2 , {wishlist: newcart })
  .then( result => {
    
    console.log(id1);
      res.redirect("/wishlist")
  })
  .catch( err => {
      console.log(err)
  })
}
 else {
  res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
}

}) 

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
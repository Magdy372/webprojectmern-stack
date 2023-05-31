import express from 'express';
import HttpError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import session from 'express-session';
import mongoose from "mongoose"
import fileUpload from 'express-fileupload';
import user1 from './models/signup_schema.js';
import product1 from './models/product_schema.js';



//import { Signup } from '../models/signup_schema';
//const Signup = require('./models/signup_schema');
//import Signup from './models/signup_schema.js';


//const session = require('express-session')
// express app

import homepage_router from "./routes/homepage.js";
import smartphones_router from "./routes/smartphones.js";
import laptop_router from "./routes/laptop.js";
import discount_router from "./routes/discount.js";
import sign_router from "./routes/sign.js";
import item_router from "./routes/item.js";
import logout_router from "./routes/logout.js";
import dashborad_router from "./routes/dashborad.js";
import customers_router from "./routes/customer.js";
import ordes_router from "./routes/orders.js";
import inventory_router from "./routes/inventory.js";
import task_router from "./routes/tasks.js";
import offers_router from "./routes/offers.js";
import addoffer_router from "./routes/addoffer.js";
import ADMIN_ADD_router from "./routes/ADMIN_ADD.js";
import profile_router from "./routes/profile.js";
import tohome_router from "./routes/tohome.js";
import map_router from "./routes/mapa.js";
import Signup_router from "./routes/signup.js";
import uploadphoto_router from "./routes/uploadphoto.js";
import addUser_router from "./routes/addUser.js";
import wishlist_router from "./routes/wishlist.js";
import cart_router from "./routes/cart.js";
import signinroute_router from "./routes/signinroute.js";
import adduserroute_router from "./routes/adduserroute.js";
import edituser_router from "./routes/edituser.js";
import updateroutr_router from "./routes/updaterouter.js";
import edititem_router from "./routes/edititem.js";
import editUseradmin_route from "./routes/editUseradmin_route.js";
import checkout_router from "./routes/checkout.js";
import checkusersdata_router from "./routes/checkusersdata.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);



const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({ secret: 'Your_Secret_Key' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//database
app.use(express.urlencoded({ extended: true }));

// object for test


app.use('/', homepage_router);

app.use('/homepage', tohome_router);

app.use('/checkout', checkout_router);

app.use('/chat', tohome_router);
//app.use('/smartphones', smartphones_router);

app.use('/edituserr', edituser_router);

//app.use('/labtops', laptop_router);


app.use('/cart',cart_router);

app.use('/wishlist',wishlist_router);

app.use('/discount', discount_router);

app.use('/sign', sign_router);

app.use('/', item_router);

app.use('/dashborad', dashborad_router);

app.use('/logout', logout_router);


app.use('/customers', customers_router);

app.use('/ordes', ordes_router);

app.use('/uploadphoto', uploadphoto_router);

app.use('/Inventory', inventory_router);

app.use('/Task', task_router);

app.use('/offers', offers_router);

app.use('/addoffer', addoffer_router);

app.use('/ADMIN-ADD', ADMIN_ADD_router);

app.use('/addUser', addUser_router);

app.use('/profile', profile_router);

app.use("/map",map_router);

app.use("/signupform",Signup_router);

app.use("/adduserform",adduserroute_router);


app.use("/signinform",signinroute_router);

app.use("/updateform",updateroutr_router);

app.use("/",edititem_router);

app.use("/",inventory_router);
app.use("/editUseradmin",editUseradmin_route)
app.use("/checkusersdata",checkusersdata_router)

app.get('/labtops', (req, res) => {
  product1.find({ category: { $in: "laptop" } })
    .then((results) => {
      res.render('labtops', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
});
});

app.get('/smartphones', (req, res) => {
  product1.find( {category: { $in: "smartphone" }})
    .then((results) => {
      res.render('smartphones', { product: results ,  user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
});
});




app.get("/addcart/:id",function(req, res, next) {
  
   
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


app.get("/addwish/:id",function(req, res, next) {
  
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
});

app.get("/cart/:id",function(req,res,next){

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

app.get("/wishlist/:id",function(req,res,next){

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
}) 




app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// listen for requests

//sho8l mongodb


mongoose.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority")
.then(()=>{

    console.log(`Example app listening on port ${process.env.PORT}`)
  })
.catch((error)=>{
    console.log("there is error")
  console.log(error)
})




 

export default app;
/*app.get('/emp/:id', (req, res) => {
    let id = req.params.id;
    let emp = employees.find((val, idx, arr) => { 
        return val.id == id });
    res.render('emp', { emp, userName: (req.session.userName === undefined ? "" : req.session.userName) });
});

app.get('/profile', (req, res) => {
    req.session.userName = req.query.un;
    req.session.pw = req.query.pw;
    req.session.x = 'x';
    res.redirect('/');
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.get('/about', (req, res) => {
    res.render('about', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});

app.get('/slide', (req, res) => {
    res.render('slide', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});


app.get('/login', (req, res) => {
    res.render('login', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});*/
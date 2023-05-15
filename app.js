import express from 'express';
import HttpError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import session from 'express-session';
import mongoose from "mongoose"
//import { Signup } from '../models/signup_schema';
//const Signup = require('./models/signup_schema');
import Signup from './models/signup_schema.js';


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
import map_router from "./routes/mapa.js"


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

//database
app.use(express.urlencoded({ extended: true }));

// object for test

const employees ={ "id": "1", "name": "Essam Eliwa", "address": "madenet nasr" , "money": "$1000"};
   

app.use('/', homepage_router);

app.use('/homepage', tohome_router);

app.use('/chat', tohome_router);

app.use('/smartphones', smartphones_router);

app.use('/labtops', laptop_router);

app.use('/discount', discount_router);

app.use('/sign', sign_router);

app.use('/item', item_router);

app.use('/dashborad', dashborad_router);

app.use('/logout', logout_router);

app.use('/customers', customers_router);

app.use('/ordes', ordes_router);

app.use('/inventory', inventory_router);

app.use('/Task', task_router);

app.use('/offers', offers_router);

app.use('/addoffer', addoffer_router);

app.use('/ADMIN-ADD', ADMIN_ADD_router);

app.use('/profile', profile_router);

app.use("/map",map_router);


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


mongoose.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{

    console.log(`Example app listening on port ${process.env.PORT}`)
  })
.catch((error)=>{
  console.log(error)
})




 
app.post("/signupform", (req, res) => {
  const signup = new Signup (req.body);
 
  console.log(req.body);
 
  signup.save( )
    .then( result => {
      res.redirect("/");
    })
    .catch( err => {
      console.log(err);
    });
}); 

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
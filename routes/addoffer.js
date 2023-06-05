import { Router } from 'express';
import product1 from "../models/product_schema.js"
import product2 from "../models/product_schema.js"
import { MongoClient, ObjectId } from "mongodb";


var router = Router();

/* GET /about page. */

router.get('/addoffer', function(req, res, next) {
  
  Promise.all([    product1.find(),    product2.find()  ])
    .then((result) => {
      if (req.session && req.session.user && req.session.user.Type === 'admin') {
        res.render('addoffer', { product: result[0], product1: result[1], user: (req.session.user === undefined ? "" : req.session.user) });
      } else {
        res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
 
});


router.get('/addoffer/:id', function(req, res, next) {
  
  product1.findById(req.params.id)
  .then(result=>{
    if (req.session && req.session.user && req.session.user.Type === 'admin') {
    console.log(req.params.id);
    console.log(result);
    res.render("addofferform",{item: result , user: (req.session.user === undefined ? "" : req.session.user) });
  }
  else{
    res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
  })
  .catch((err)=>{
    console.log(err);
  });
  
});


router.post('/addoffer/filter', (req, res) => {
  if (req.session && req.session.user && req.session.user.Type === 'admin'){
  const category = req.body.category;
  const brand = req.body.brand;

  let query = {};

  if (category !== 'All' && brand !== 'All') {
    query = { category: category, brand: { $regex: new RegExp(brand, "i") } };
  } else if (category !== 'All') {
    query = { category: category };
  } else if (brand !== 'All') {
    query = { brand: { $regex: new RegExp(brand, "i") } };
  }

  Promise.all([
    product1.find(query),
    product2.find(query)
  ])
    .then(([result1, result2]) => {
      res.render('addoffer', { product: result1, product1: result2, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
  }
  else{
    res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
});

router.post('/',async function(req, res, next) {
  
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii Ahmeddddd")

  if (req.session && req.session.user && req.session.user.Type === 'admin') {
      
  
    try {
      const client = await MongoClient.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority");
      const db = client.db('test');

      const result = await db.collection('products').updateMany(
          { _id: new ObjectId(req.body.id) },
          { $set: { offervalue: req.body.offervalue , hasoffer: req.body.hasoffer}}
        );
        
      client.close();
  
      if (result.modifiedCount > 0) {
        res.redirect('/offers');
        
      } else {
        res.send('No data updated');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Server error');
    }
}
  else{
    res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
  
});



/*if (req.session && req.session.user && req.session.user.Type === 'admin') {
      
  
    try {
      const client = await MongoClient.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority");
      const db = client.db('test');
      //console.log(req.session.user._id.toString())
      console.log(req.body.fullname)
      const result = await db.collection('signups').updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { fullname: req.body.fullname,mail: req.body.mail,Type: req.body.Type }}
        );
        
      client.close();
  
      if (result.modifiedCount > 0) {
        res.redirect('/dashborad',{ user: (req.session.user === undefined ? "" : req.session.user) });
        
      } else {
        res.send('No user data updated');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).send('Server error');
    }
}
  else{
    res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
  */


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
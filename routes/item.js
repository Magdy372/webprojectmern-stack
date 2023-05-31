import { Router } from 'express';
import product1 from '../models/product_schema.js'
import review_schema from '../models/review_schema.js'
var router = Router();

/* GET /about page. */
router.get("/item/:id", function(req, res, next) {

  product1.findById(req.params.id)
  .then(result => {
    const datareview= result.review
    console.log(req.params.id);
    console.log(result);
    review_schema.find({_id:{$in:result.review}})
    .then(result1 =>{
      console.log(result1)
       res.render("item", { item: result,re:result1, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
  })
  .catch(err => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  });
  /*product1.findById(req.params.id)
    .populate('review') // Populate the review field
    .exec()
    .then(result => {
      console.log(req.params.id);
      console.log(result);
      review_schema.findById(result.review)
      .then(result1 =>{
        res.render("item", { item: result, re:result1 , user: (req.session.user === undefined ? "" : req.session.user) });
      })
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });*/
  
});

router.post("/item/:id",function(req,res,next){
 
  const id = { _id: req.params.id };
  const User = {user: (req.session.user === undefined ? "" : req.session.user)}
const newreview = new review_schema ({
  reviewer_name:req.session.user.fullname,
  rate:req.body.rate,
  review:req.body.comment
})
console.log('oooooooooooooooooooooooo')



newreview.save()
  .then(result => {
    product1.findOne(id)
      .exec()
      .then(pro => {
        pro.review.push(newreview._id); // Push the review ID
        return pro.save(); // Save the updated product
      })
      .then(result1 => {
        console.log(result1);
        res.redirect(`/item/${req.params.id}`);
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
      });
  })
  .catch(err => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  });

});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
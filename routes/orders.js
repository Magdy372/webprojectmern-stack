import { Router } from 'express';
import product1 from '../models/product_schema.js'
import user1 from '../models/signup_schema.js'
import order from '../models/order.js'
import orderitem from '../models/orderItem.js'
var router = Router();


/* GET /about page. */
router.get('/ordes', function(req, res, next) {
  if (req.session && req.session.user && req.session.user.Type === 'admin') {
    var orderarr = [];
var orderitemarr = [];
var customerarr = [];
var productarr = [];

order.find()
  .populate('orderItems')
  .populate('customer')
  .exec()
  .then(results => {
    orderarr = results;
    console.log(orderarr);
    console.log('ppppppppppppppppppp');

    const orderItemPromises = results.map(element => {
      const orderItemIds = element.orderItems.map(orderItem => orderItem._id);
      return orderitem.findById(orderItemIds);
    });

    return Promise.all(orderItemPromises);
  })
  .then(orderItems => {
    orderitemarr = orderItems;
    console.log(orderitemarr);
    console.log('ooooooooooooooooooooo');

    const productPromises = orderItems.map(result1 => {
      return product1.findById(result1.product._id);
    });

    return Promise.all(productPromises);
  })
  .then(products => {
    productarr = products;
    console.log(productarr);
    console.log('cccccccccccccccccccccc');

    const customerPromises = orderarr.map(element => {
      return user1.findById(element.customer);
    });

    return Promise.all(customerPromises);
  })
  .then(customers => {
    customerarr = customers;
    console.log(customerarr);
    console.log('vvvvvvvvvvvvvvvvvvvvvvv');

    res.render("ordes", {
      Order: orderarr,
      product: productarr,
      customer: customerarr,
      user: (req.session.user === undefined ? "" : req.session.user)
    });
  })
  .catch(err => {
    // Handle any errors that occurred
    console.error(err);
    // Render an error page or handle the error in an appropriate way
    res.render("error");
  });
       
  }
 else{
       res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/ordes/:id',function(req, res, next){
  order.updateOne({_id: req.params.id},{status:'confirmed'})
  .then(result =>{
     res.redirect('/ordes')
  })
})

router.get('/ordes/delete/:id',function(req, res, next){
  order.findByIdAndDelete(req.params.id)
  .then(result =>{
     res.redirect('/ordes')
  })
})
router.get('/ordes/paused/:id',function(req, res, next){
  order.updateOne({_id: req.params.id},{status:'paused'})
  .then(result =>{
     res.redirect('/ordes')
  })
})
/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
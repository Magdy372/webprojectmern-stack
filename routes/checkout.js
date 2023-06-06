import { Router } from 'express';
import product11 from '../models/product_schema.js';
import orderitem from '../models/orderItem.js';
import Order from '../models/order.js'
import user1 from '../models/signup_schema.js'
import { render } from 'ejs';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
  if ( !req.session || req.session.user === undefined || req.session.user.Type === 'user'){
  res.render('checkout',{ user: (req.session.user === undefined ? "" : req.session.user) })
  }
  else {
    res.render("noaccess", { user: (req.session.user === undefined ? "" : req.session.user) });
  }
});

router.post('/', function(req, res, next) {
  const arr = req.session.user.cart;
  const newcart=[]
  req.session.user.cart =newcart;
  user1.findByIdAndUpdate(req.session.user._id,{cart: newcart})
  .then(result3 =>{
    console.log('cart deleted');
  })
  .catch(err => {
    console.log(err);
    res.status(500).send("Error while deleting the cart.");
  });
  let sumprice = 0;
  console.log('ppppppppppppppppppppppp');

  product11.find({ _id: { $in: arr } })
    .then(result => {
      console.log(result);
      result.forEach(element => {
        console.log(element.Price)
        console.log(element.offervalue)
        if (element.hasoffer === "true") {
          let newprice = element.Price - parseInt(element.Price * (element.offervalue / 100));
          sumprice += parseInt(newprice);
        } else {
          sumprice += parseInt(element.Price);
        }
      });
    
      const orderItems = result.map(element => {
        return new orderitem({
          product: element
        });
      });

      orderitem.insertMany(orderItems)
        .then(result1 => {
          console.log('ppppppppppppppppppppppp');
          console.log(result1);

          if (!isNaN(sumprice)) {
            const order = new Order({
              orderItems: result1,
              buildingno: req.body.buildingno,
              shippingAddress: req.body.shippingAddress,
              city: req.body.city,
              street: req.body.street,
              country: req.body.country,
              phone: req.body.phone,
              status: req.body.status,
              totalPrice: sumprice,
              customer: req.session.user
            });

            order.save()
              .then(result2 => {
                console.log(result2);
                res.render('thanks',{ user: (req.session.user === undefined ? "" : req.session.user) })
              })
              .catch(err => {
                console.log(err);
                res.status(500).send("Error while saving the order.");
              });
          } else {
            console.log("Invalid sumprice: ", sumprice);
            res.status(500).send("Invalid sumprice value.");
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("Error while saving order items.");
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error while retrieving products.");
    });
  });


router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
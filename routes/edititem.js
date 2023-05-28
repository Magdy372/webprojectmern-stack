import { Router } from 'express';
import session from 'express-session';
import product1 from '../models/product_schema.js'
import { __filename } from '../app.js';
import { __dirname } from '../app.js';
import path from 'path';
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

router.post('/edititem/:id', function(req, res, next) {
    let imgFile;
    let uploadPath;
    console.log(__dirname + '/public/images/');
    console.log(req.files);
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    imgFile = req.files && req.files.image;
    uploadPath = __dirname + '/public/images/' +  req.body.title + path.extname(imgFile.name)
    console.log(uploadPath)
    console.log(req.body)
    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      const id = req.params.id
      
      const pro = ({
        title: req.body.title,
        brand: req.body.brand,
        Price: req.body.Price, // corrected 'Price' to 'price'
        image: req.body.title + path.extname(imgFile.name),
        description: req.body.description, // corrected 'descrption' to 'description'
        category: req.body.category
      });
  
      
      
      product1.findByIdAndUpdate(id,pro)
        .then(result => {
            console.log(result)
          res.redirect('/inventory');
        })
        .catch(err => {
          console.log(err);
        });
    });
   
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
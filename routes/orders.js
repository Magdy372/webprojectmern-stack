import { Router } from 'express';
import product1 from '../models/product_schema.js'
import product2 from '../models/product_schema.js'
import { __dirname } from '../app.js';
import fs from 'fs'
import path from 'path';
var router = Router();


/* GET /about page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.user && req.session.user.Type === 'admin') {
    res.render("ordes",{ user: (req.session.user === undefined ? "" : req.session.user) });  }
else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
});



/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
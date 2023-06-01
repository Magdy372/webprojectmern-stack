import { Router } from 'express';
import signin from '../models/signup_schema.js'
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
    signin.find()
    .then(result => {
      if(req.session.user.Type==='admin')
      {
      res.render('customers',{user: result , user: (req.session.user === undefined ? "" : req.session.user) })
    }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
  })
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
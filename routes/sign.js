import { Router } from 'express';
import session from 'express-session';
import  signinform  from '../controller/signin.js';
import  signupform  from '../controller/signup.js';
var router = Router();


/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("sign",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/",signinform,signupform)

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

//router.post("/",signupform )

export default router;
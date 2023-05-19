
import { Router } from 'express';
import  signinform  from '../controller/signin.js'
import session from 'express-session';

var router = Router();

router.post("/",signinform)

router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

  export default router
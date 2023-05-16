import { Router } from 'express';
import  signupform  from '../controles/signup.js'

var router = Router();

router.post("/",signupform)

router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

  export default router
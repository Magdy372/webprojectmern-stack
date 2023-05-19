import { Router } from 'express';
import  signinform  from '../controles/signin.js'

var router = Router();

router.post("/",signinform)

router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

  export default router
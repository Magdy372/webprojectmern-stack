import { Router } from 'express';
import  signupform  from '../controller/signup.js'
import checkUN from '../controller/signup.js'

var router = Router();

router.post("/",signupform.signupform)
router.post('/checkUN',checkUN.checkUN)

router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

  export default router
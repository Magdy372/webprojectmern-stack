import { Router } from 'express';
import  updateusers  from '../controller/update.js'

var router = Router();

router.post("/",updateusers)

router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

  export default router
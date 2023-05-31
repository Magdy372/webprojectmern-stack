import { Router } from 'express';
import  checkusersssdata  from '../controller/checkusersssdata.js'


var router = Router();

router.get("/",checkusersssdata);



router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

  export default router
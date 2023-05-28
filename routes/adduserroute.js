import { Router } from 'express';
import  adduserform  from '../controller/adduser.js'
var router = Router();



router.post("/",adduserform)


/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
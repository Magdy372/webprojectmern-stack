import { Router } from 'express';
import  adduserform  from '../controller/adduser.js'
import checkUN from '../controller/adduser.js'


var router = Router();
router.post("/",adduserform.adduserform)
router.post('/checkUN',checkUN.checkUN)



/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
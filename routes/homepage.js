import { Router } from 'express';
import session from 'express-session';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
    /*req.session.Email = req.query.email;
    req.session.psw = req.query.psw;
    req.session.x = 'x';*/
    res.render("homepage");
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
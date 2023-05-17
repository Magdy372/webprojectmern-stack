import { Router } from 'express';
var router = Router();


/* GET /about page. */
router.get('/dashborad', function(req, res, next) {
    req.session.Email = req.query.email;
    req.session.psw = req.query.psw;
    req.session.x = 'x';
    res.render("upload",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
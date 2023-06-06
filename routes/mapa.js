import { Router } from 'express';
var router = Router();


/* GET /about page. */
router.get('/map', function(req, res, next) {
    res.render("mapa",{ user: (req.session.user === undefined ? "" : req.session.user) });
});
router.get('/aboutus', function(req, res, next) {
  res.render("aboutus",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
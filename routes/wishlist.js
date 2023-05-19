import { Router } from 'express';
var router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("wishlist");
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
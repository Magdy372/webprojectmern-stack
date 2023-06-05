import { Router } from 'express';
import session from 'express-session';
//import { initializeLanguageSelector } from '../controllers/lange.js';

const router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("tran", { user: (req.session.user === undefined ? "" : req.session.user) });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
});

//initializeLanguageSelector(); // Call the initialization function here

export default router;
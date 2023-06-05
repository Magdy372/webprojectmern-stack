import { Router } from 'express';
import session from 'express-session';
import  initializeLanguageSelector  from '../controller/languageSelector.js';

const router = Router();

/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("tran", { user: (req.session.user === undefined ? "" : req.session.user) });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
});

router.post('/',initializeLanguageSelector)

//initializeLanguageSelector; // Call the initialization function here

export default router;
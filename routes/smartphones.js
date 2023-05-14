import { Router } from 'express';
var router = Router();

const employees ={ "id": "1", "name": "Essam Eliwa", "address": "madenet nasr" , "money": "$1000"};
/* GET /about page. */
router.get('/', function(req, res, next) {
    res.render("smartphones",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
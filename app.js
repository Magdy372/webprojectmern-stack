import express from 'express';

import session from 'express-session';
//const session = require('express-session')
// express app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({ secret: 'Your_Secret_Key' }));


// object for test

const employees ={ "id": "1", "name": "Essam Eliwa", "address": "madenet nasr" , "money": "$1000"};
   

app.get('/', (req, res) => {

    req.session.Email = req.query.email;
    req.session.psw = req.query.psw;
    req.session.x = 'x';
    res.render("homepage",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

app.get('/homepage', (req, res) => {
    res.render("homepage",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

app.get('/smartphones', (req, res) => {
    res.render("smartphones",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

app.get('/labtops', (req, res) => {
    res.render("labtops",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

app.get('/discount', (req, res) => {
    res.render("discount",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});
app.get('/sign', (req, res) => {
    res.render("sign" ,{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});
app.get('/item', (req, res) => {
    res.render("item",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});

app.get('/dashborad', (req, res) => {
    res.render("dashborad",{ employees, Email: (req.session.Email === undefined ? "" : req.session.Email) });
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/customers', (req, res) => {
    res.render("customers");
});
app.get('/ordes', (req, res) => {
    res.render("ordes");
});
app.get('/inventory', (req, res) => {
    res.render("inventory");
});
app.get('/task', (req, res) => {
    res.render("task");
});
app.get('/offers', (req, res) => {
    res.render("offers");
});
app.get('/addoffer', (req, res) => {
    res.render("addoffer");
});
app.get('/customersupport', (req, res) => {
    res.render("customersupport");
});
app.get('/chattab', (req, res) => {
    res.render("chattab");
});
app.get('/ADMIN-ADD', (req, res) => {
    res.render("ADMIN-ADD");
});
app.get('/profile', (req, res) => {
    res.render("profile");
});
app.get('/login', (req, res) => {
    res.render("login");
});
app.get('/map', (req, res) => {
    res.render("map");
});



// listen for requests
app.listen(8050);


/*app.get('/emp/:id', (req, res) => {
    let id = req.params.id;
    let emp = employees.find((val, idx, arr) => { 
        return val.id == id });
    res.render('emp', { emp, userName: (req.session.userName === undefined ? "" : req.session.userName) });
});
app.get('/profile', (req, res) => {
    req.session.userName = req.query.un;
    req.session.pw = req.query.pw;
    req.session.x = 'x';
    res.redirect('/');
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.get('/about', (req, res) => {
    res.render('about', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});

app.get('/slide', (req, res) => {
    res.render('slide', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});
app.get('/login', (req, res) => {
    res.render('login', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});*/
import express from 'express';
//const session = require('express-session')
// express app
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("homepage");
});


app.get('/smartphones', (req, res) => {
    res.render("smartphones");
});

app.get('/labtops', (req, res) => {
    res.render("labtops");
});

app.get('/discount', (req, res) => {
    res.render("discount");
});
app.get('/sign', (req, res) => {
    res.render("sign");
});
app.get('/item', (req, res) => {
    res.render("item");
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
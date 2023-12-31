const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');

const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override');
const ExpressError = require('./utils/expressError');

const campgroundRouter = require('./router/campgroundrouter');
const reviewRouter = require('./router/reviewrouter');

app = express();
mongoose.connect('mongodb://localhost:27017/yelp-camp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true,
    });

mongoose.connection.once('open', function () { console.log('connected to mongodb') });
mongoose.connection.on('error', function (error) { console.log('error connecting to mongodb') });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessonConfig = {
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessonConfig))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})
app.get('/', function (req, res) {
    res.render('pages/home');
});


// review router
app.use('/campgrounds/:id/review', reviewRouter);
//campgrounds router
app.use('/campgrounds', campgroundRouter);

app.all('*', function (req, res, next) {
    err = new ExpressError(404, 'page not found');
    next(err);
});


// error handling
app.use(function (err, req, res, next) {
    let { message = 'something went wrong', statusCode = 500 } = err;
    res.status(statusCode).send(message);
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});

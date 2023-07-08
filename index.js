const express = require('express');
const mongoose = require('mongoose');
const campGround = require('./models/campground');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const asyncwrap = require('./utils/asyncwrap');
const ExpressError = require('./utils/expressError');
const { validateCampground, validateReview } = require('./utils/validatecampgroung');
const Review = require('./models/review');
const campgroundRouter = require('./router/campgroundrouter');
const reviewRouter = require('./router/reviewrouter');

app = express();
mongoose.connect('mongodb://localhost:27017/yelp-camp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.once('open', function () { console.log('connected to mongodb') });
mongoose.connection.on('error', function (error) { console.log('error connecting to mongodb') });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.get('/', function (req, res) {
    res.render('pages/home');
});


// review router
app.use('/campgrounds/:id/review', reviewRouter);
//campgrounds router
app.use('/campgrounds', campgroundRouter);



// error handling
app.use(function (err, req, res, next) {
    let { message = 'something went wrong', statusCode = 500 } = err;
    res.status(statusCode).send(message + err);
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});
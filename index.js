const express = require('express');
const mongoose = require('mongoose');
const campGround = require('./models/campground');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const asyncwrap = require('./utils/asyncwrap');
const ExpressError = require('./utils/expressError');
const validateCampground = require('./utils/validatecampgroung');

app = express();
mongoose.connect('mongodb://localhost:27017/yelp-camp', 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true
     });

mongoose.connection.once('open', function () {console.log('connected to mongodb')});
mongoose.connection.on('error', function (error) {console.log('error connecting to mongodb')});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.get('/', function (req, res) {
    res.render('pages/home');
});

// show all campgrounds
app.get('/campgrounds', asyncwrap(async function (req, res) {
    const campgrounds = await campGround.find({});
    res.render('pages/campgrounds', {campgrounds});
}));

// show one campground
app.get('/campgrounds/:id/show', asyncwrap(async function (req, res) {
    const {id} = req.params;
    const campground = await campGround.findById(id);
    console.log(campground);
    res.render('pages/showcamp', {campground});
}));



// new campgrounds

app.get('/campgrounds/new',function (req, res) {
    res.render('pages/newcamp');
})
app.post('/campgrounds/new',validateCampground,asyncwrap( async function (req, res,next) {

    const newcamp = new campGround({
        title:req.body.title, 
        location: req.body.location,
        image:req.body.image,
        price:req.body.price,
        discription:req.body.discription
    });
    await newcamp.save();
    res.redirect('/campgrounds');
}));

// delete campground
app.delete('/campgrounds/:id/', asyncwrap(async function (req, res) {
    const {id} = req.params;
    await campGround.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

// edit campground
app.get('/campgrounds/edit/:id', asyncwrap(async function (req, res) {
    const {id} = req.params;
    const campground = await campGround.findById(id);
    res.render('pages/editcamp', {campground});
}));

app.put('/campgrounds/:id/',validateCampground, asyncwrap(async function (req, res) {
    curCourse = await campGround.findById(id);
    curCourse.title = req.body.title;
    curCourse.location = req.body.location;
    curCourse.image = req.body.image
    curCourse.price = req.body.price;
    curCourse.discription = req.body.discription;
    
    await curCourse.save();
    res.redirect(`/campgrounds/${id}/show`);
}));


// error handling
app.use(function (err,req,res,next) {
    let {message= 'something went wrong', statusCode= 500} = err;
    res.status(statusCode).send(message);
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});
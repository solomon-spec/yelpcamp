const express = require('express');
const mongoose = require('mongoose');
const campGround = require('./models/campground');
const path = require('path');
const methodOverride = require('method-override');

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


app.get('/', function (req, res) {
    res.render('home');
});

// show all campgrounds
app.get('/campgrounds', async function (req, res) {
    const campgrounds = await campGround.find({});
    res.render('campgrounds', {campgrounds});
})

// show one campground
app.get('/campgrounds/:id/show', async function (req, res) {
    const {id} = req.params;
    const campground = await campGround.findById(id);
    console.log(campground);
    res.render('showcamp', {campground});
});



// new campgrounds

app.get('/campgrounds/new', function (req, res) {
    res.render('newcamp');
})
app.post('/campgrounds/new', async function (req, res) {

    const newcamp = new campGround({title:req.body.title, location: req.body.location});
    newcamp.save();
    res.redirect('/campgrounds');
})

// delete campground
app.delete('/campgrounds/:id/', async function (req, res) {
    const {id} = req.params;
    await campGround.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

// edit campground
app.get('/campgrounds/edit/:id', async function (req, res) {
    const {id} = req.params;
    const campground = await campGround.findById(id);
    res.render('editcamp', {campground});
})

app.put('/campgrounds/:id/', async function (req, res) {
    const {id} = req.params;
    curCourse = await campGround.findById(id);
    curCourse.title = req.body.title;
    curCourse.location = req.body.location;
    await curCourse.save();
    res.redirect('/campgrounds');
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});
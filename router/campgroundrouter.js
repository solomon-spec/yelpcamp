const router = require('express').Router();
const asyncwrap = require('../utils/asyncwrap');
const campGround = require('../models/campground');
const { validateCampground } = require('../utils/validatecampgroung');

// show all campgrounds
router.get('/', asyncwrap(async function (req, res) {
    const campgrounds = await campGround.find({});
    res.render('pages/campgrounds', { campgrounds });
}));

// show one campground
router.get('/:id/show', asyncwrap(async function (req, res) {
    const { id } = req.params;
    const campground = await campGround.findById(id).populate('reviews');
    console.log(campground);
    res.render('pages/showcamp', { campground });
}));



// new campgrounds

router.get('/new', function (req, res) {
    res.render('pages/newcamp');
})
router.post('/new', validateCampground, asyncwrap(async function (req, res, next) {

    const newcamp = new campGround({
        title: req.body.title,
        location: req.body.location,
        image: req.body.image,
        price: req.body.price,
        discription: req.body.discription
    });
    await newcamp.save();
    res.redirect('/campgrounds');
}));


// delete campground
router.delete('/:id/', asyncwrap(async function (req, res, next) {
    const { id } = req.params;
    await campGround.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));


// edit campground
router.get('/edit/:id', asyncwrap(async function (req, res, next) {
    const { id } = req.params;
    const campground = await campGround.findById(id);
    res.render('pages/editcamp', { campground });
}));

router.put('/:id/', validateCampground, asyncwrap(async function (req, res, next) {
    const { id } = req.params;
    curCourse = await campGround.findById(id);
    curCourse.title = req.body.title;
    curCourse.location = req.body.location;
    curCourse.image = req.body.image
    curCourse.price = req.body.price;
    curCourse.discription = req.body.discription;

    await curCourse.save();
    res.redirect(`/campgrounds/${id}/show`);
}));

module.exports = router;

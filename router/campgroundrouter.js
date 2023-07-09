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

    if (!campground) {
        req.flash('error', 'campground not found')
        return res.redirect('/campgrounds');
    }
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
    req.flash('success', 'succsesfully created campground')
    res.redirect('/campgrounds');
}));


// delete campground
router.delete('/:id/', asyncwrap(async function (req, res, next) {
    const { id } = req.params;
    await campGround.findByIdAndDelete(id);
    if (!campGround) {
        req.flash('error', 'campground not found')
        return res.redirect('/campgrounds');
    }
    req.flash('success', 'succsesfully deleted campground')
    res.redirect('/campgrounds');
}));


// edit campground
router.get('/edit/:id', asyncwrap(async function (req, res, next) {
    const { id } = req.params;
    const campground = await campGround.findById(id);
    if (!campground) {
        req.flash('error', 'campground not found')
        return res.redirect('/campgrounds');
    }
    res.render('pages/editcamp', { campground });
}));

router.put('/:id/', validateCampground, asyncwrap(async function (req, res, next) {
    const { id } = req.params;
    curCourse = await campGround.findById(id);
    if (!curCourse) {
        req.flash('error', 'campground not found')
        return res.redirect('/campgrounds');
    }
    curCourse.title = req.body.title;
    curCourse.location = req.body.location;
    curCourse.image = req.body.image
    curCourse.price = req.body.price;
    curCourse.discription = req.body.discription;
    await curCourse.save();
    req.flash('success', 'succsesfully updated campground')
    res.redirect(`/campgrounds/${id}/show`);
}));

module.exports = router;

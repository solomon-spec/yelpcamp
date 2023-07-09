const router = require('express').Router({ mergeParams: true });
const asyncwrap = require('../utils/asyncwrap');
const campGround = require('../models/campground');
const { validateReview } = require('../utils/validatecampgroung');
const Review = require('../models/review');


router.post('/new', validateReview, asyncwrap(async function (req, res) {
    let { id } = req.params;
    let { rating, content } = req.body;
    let campground = await campGround.findById(id);
    console.log(campground);
    let newReview = new Review({ rating, content });
    campground.reviews.push(newReview);
    await newReview.save();
    await campground.save();
    req.flash('success', 'succsesfully created review')
    res.redirect(`/campgrounds/${id}/show`);
}));

// delete review
router.delete('/:reviewid', asyncwrap(async function (req, res) {
    const { id, reviewid } = req.params;
    await campGround.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash('success', 'succsesfully deleted review')
    res.redirect(`/campgrounds/${id}/show`);
}));

module.exports = router;
const joi = require('joi');
const ExpressError = require('./expressError');
const campGroundSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    image: joi.string().required(),
    discription: joi.string().required(),
    location: joi.string().required()

})

const reviewSchema = joi.object({
    rating: joi.number().required().min(1).max(5),
    content: joi.string().required()
});
module.exports.validateCampground = function (req, res, next) {
    const result = campGroundSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
}

module.exports.validateReview = function (req, res, next) {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
}
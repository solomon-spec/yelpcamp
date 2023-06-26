const joi = require('joi');
const ExpressError = require('./expressError');
const campGroundSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    image: joi.string().required(),
    discription: joi.string().required(),
    location: joi.string().required()

})
module.exports = function (req, res, next) {
const result = campGroundSchema.validate(req.body);
if (result.error) {
    const msg = result.error.details.map(el => el.message).join(',');
    throw new ExpressError(400, msg);
}
else{
    next();
}
}
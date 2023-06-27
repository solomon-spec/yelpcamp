const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    content: String,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

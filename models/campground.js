const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const model = mogoose.model;

const campGroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

const CampGround = model('CampGround', campGroundSchema);

module.exports = CampGround;
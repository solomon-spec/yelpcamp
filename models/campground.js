const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const model = mogoose.model;

const campGroundSchema = new Schema({
    title:{ 
        type:String,
        required: true},
    price: {
        type: Number,
        min: 0,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true

    }
});

const CampGround = model('CampGround', campGroundSchema);

module.exports = CampGround;
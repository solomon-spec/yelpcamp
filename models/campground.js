const mogoose = require('mongoose');
const Review = require('./review');
const Schema = mogoose.Schema;
const model = mogoose.model;

const campGroundSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    image: {
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
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// debug
campGroundSchema.post('findOneAndDelete', async function (doc) {
    console.log(doc);
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }

});
const CampGround = model('CampGround', campGroundSchema);
module.exports = CampGround;
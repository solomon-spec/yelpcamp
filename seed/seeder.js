
const { places, descriptors }  = require('./names');
const cities = require('./cities');
const mongoose = require('mongoose');
const CampGround = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true
     });

mongoose.connection.once('open', function () {console.log('connected to mongodb')});
mongoose.connection.on('error', function (error) {console.log('error connecting to mongodb')});
async function createSeed() {
    await CampGround.deleteMany({})
    for(let i = 0; i < 50; i++){
        let i = Math.floor(Math.random()*descriptors.length)
        let j = Math.floor(Math.random()*places.length)
        let campName = `${descriptors[i]} ${places[j]}`
        let k = Math.floor(Math.random()*cities.length)
        let nplace = `${cities[k].city} ${cities[k].state}`
        newCamp = new CampGround({title:campName, location:nplace})
        newCamp.save()
    }
}
createSeed().then(() => mongoose.connection.close() )
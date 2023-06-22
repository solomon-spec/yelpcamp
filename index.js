express = require('express');
const mongoose = require('mongoose');
path = require('path');
app = express();
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', function (req, res) {
    res.render('home');
});



app.listen(3000, function () {
    console.log('listening on port 3000!');
});
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose")
const route = require('./routes/routes.js');
var multer = require('multer');

const app = express();
app.use(multer().any());
app.use(bodyParser.json());

app.use('/', route);

mongoose.connect("mongodb+srv://rubygupta7505:GDDYMfHDEGehjUj0@cluster0.xf64f.mongodb.net/virtualBusiness" )
    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))


app.listen(3000, function(){
    console.log('Express is running on port 3000');
})



// const express = require('express');
// var bodyParser = require('body-parser');

// const route = require('./routes/routes.js');

// const app = express();

// app.use(bodyParser.json());

// const mongoose = require("mongoose")

// app.use('/', route);

// mongoose.connect("mongodb+srv://rubygupta7505:GDDYMfHDEGehjUj0@cluster0.xf64f.mongodb.net/Project5" )
//     .then(() => console.log('mongodb is connected'))
//     .catch(err => console.log(err))


// app.listen(3000, function(){
//     console.log('Express is running on port 3000');
// })
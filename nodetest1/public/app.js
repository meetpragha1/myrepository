const path = require('path');
var express = require('express');
var app = express();
var todocontroller = require('./controllers/todocontrollers')
app.set('view engine','ejs');
todocontroller(app);
app.listen(3000);
app.use(express.static(path.join(__dirname,'views')));
console.log('You are in 3000');

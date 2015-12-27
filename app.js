var express = require('express'),
    path = require('path')
    ejs = require('ejs'),
    shortid = require('shortid'),
    bodyParser = require('body-parser'),
    request = require('request');

var config = require('./config/config.js'),
    index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.enable('strict routing');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* initialize worker */
var api = require('./workers/api-worker');


/* routes */
app.use('/', index);

app.listen(config.port);
console.log(
  'cookiemcreator ready to bake on port ' + config.port + '.'
);

module.exports = app;
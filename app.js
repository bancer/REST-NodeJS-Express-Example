var express = require('express');
var bodyParser = require('body-parser');
var MySQL = require('./MySQL');
var app = express();

MySQL.open();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended : true
})); // for parsing application/x-www-form-urlencoded

var CarsController = require('./controllers/CarsController');
var UsersController = require('./controllers/UsersController');

app.use('/cars', CarsController);
app.use('/users', UsersController);

app.listen(8081, function() {
	console.log('Example app listening on port 8081!');
});

//MySQL.close();
//app.on('SIGINT', MySQL.close);
//app.on('SIGTERM', MySQL.close);

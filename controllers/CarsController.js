var express = require('express');
var MySQL = require('../MySQL');
var connection = MySQL.getConnection();

var router = express.Router();

router.get('/', function(request, response) {
	var sql = 'SELECT Car.id, Car.user_id, Car.name, Car.construction_year, User.email ' +
		'FROM cars AS Car ' +
		'LEFT JOIN users AS User ON Car.user_id=User.id ' +
		'ORDER BY Car.id DESC';
	MySQL.connection.query(sql, function(err, rows) {
		if (err) {
			console.log(err);
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			var cars = [];
			for (var i = 0; i < rows.length; i++) {
				cars[i] = {
					Car : {
						id : rows[i].id,
						user_id : rows[i].user_id,
						name : rows[i].name,
						construction_year : rows[i].construction_year
					},
					User : {
						id : rows[i].user_id,
						email : rows[i].email
					}
				};
			}
			result = {
				Error : false,
				Message : 'Success',
				cars : cars
			};
		}
		response.json(result);
	});
});

router.post('/', function(request, response) {
	var sql = 'INSERT INTO cars (user_id, name, construction_year) VALUES (?,?,?)';
	var values = [
		request.body.Car.user_id, 
		request.body.Car.name, 
		request.body.Car.construction_year
	];
	MySQL.connection.query(sql, values, function(err, rows) {
		if (err) {
			console.log(err);
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Car Added!'
			};
		}
		response.json(result);
	});
});

router.get('/:id', function(request, response) {
	var sql = "SELECT id, user_id, name, construction_year FROM cars WHERE id = ?";
	var values = [request.params.id];
	MySQL.connection.query(sql, values, function(err, rows) {
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Success',
				Car : rows[0]
			};
		}
		response.json(result);
	});
});

router.put('/:id', function(request, response) {
	var sql = "UPDATE cars SET user_id = ?, name = ?, construction_year = ? WHERE id = ?";
	var values = [
		request.body.Car.user_id,
		request.body.Car.name,
		request.body.Car.construction_year,
		request.params.id
	];
	MySQL.connection.query(sql, values, function(err, rows) {
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Updated the car with id ' + request.params.id
			};
		}
		response.json(result);
	});
});

router.delete('/:id', function(request, response) {
	var sql = "DELETE FROM cars WHERE id = ?";
	var values = [request.params.id];
	MySQL.connection.query(sql, values, function(err, rows) {
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Deleted the car with id ' + request.params.id
			};
		}
		response.json(result);
	});
});

router.get('/user/:email', function(request, response) {
	var sql = 'SELECT Car.id, Car.user_id, Car.name, Car.construction_year, ' +
		'User.family_id, User.email, Family.name AS fName ' +
		'FROM cars AS Car ' +
		'LEFT JOIN users AS User ON Car.user_id=User.id ' +
		'LEFT JOIN families AS Family ON User.family_id=Family.id ' +
		'WHERE User.family_id = (SELECT u.family_id FROM users AS u WHERE u.email = ?) ' +
		'ORDER BY Car.id DESC';
	var values = [request.params.email];
	MySQL.connection.query(sql, values, function(err, rows) {
		if (err) {
			console.log(err);
			result = {
					Error : true,
					Message : 'Error executing MySQL query.'
			};
		} else {
			var cars = [];
			for (var i = 0; i < rows.length; i++) {
				cars[i] = {
						Car : {
							id : rows[i].id,
							user_id : rows[i].user_id,
							name : rows[i].name,
							construction_year : rows[i].construction_year
						},
						User : {
							id : rows[i].user_id,
							family_id : rows[i].family_id,
							email : rows[i].email
						},
						Family : {
							id : rows[i].family_id,
							name : rows[i].fName
						}
				};
			}
			result = {
					Error : false,
					Message : 'Success',
					cars : cars
			};
		}
		response.json(result);
	});
});

module.exports = router;

var express = require('express');
// TODO: change md5 to a safer algorithm.
var md5 = require('MD5');
var MySQL = require('../MySQL');
var connection = MySQL.getConnection();

var router = express.Router();

router.get('/', function(request, response) {
	var sql = "SELECT id, email FROM users AS User ORDER BY id DESC";
	MySQL.connection.query(sql, function(err, rows) {
		var result;
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			var users = [];
			for (var i = 0; i < rows.length; i++) {
				users[i] = {
					User : rows[i]
				};
			}
			result = {
				Error : false,
				Message : 'Success',
				users : users
			};
		}
		response.json(result);
	});
});

router.post('/', function(request, response) {
	var sql = 'INSERT INTO users (email, password) VALUES (?,?)';
	var values = [request.body.User.email, md5(request.body.User.password)];
	MySQL.connection.query(sql, values, function(err, rows) {
		var result;
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'User Added!'
			};
		}
		response.json(result);
	});
});

router.get('/:user_id', function(request, response) {
	var sql = "SELECT id, email FROM users WHERE id = ?";
	var values = [request.params.user_id];
	MySQL.connection.query(sql, values, function(err, rows) {
		var result;
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Success',
				User : rows[0]
			};
		}
		response.json(result);
	});
});

router.put('/', function(request, response) {
	var sql = "UPDATE users SET password = ? WHERE email = ?";
	var values = [md5(request.body.User.password), request.body.User.email];
	MySQL.connection.query(sql, values, function(err, rows) {
		var result;
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Updated the password for email '
						+ request.body.User.email
			};
		}
		response.json(result);
	});
});

router.delete('/:email', function(request, response) {
	var sql = "DELETE FROM users WHERE email = ?";
	var values = [request.params.email];
	MySQL.connection.query(sql, values, function(err, rows) {
		var result;
		if (err) {
			result = {
				Error : true,
				Message : 'Error executing MySQL query.'
			};
		} else {
			result = {
				Error : false,
				Message : 'Deleted the user with email '
					+ request.params.email
			};
		}
		response.json(result);
	});
});

module.exports = router;

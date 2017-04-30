var mysql = require('mysql')

var MySQL = {

	getConnection : function() {
		return this.connection;
	},

	open : function() {
		this.connection = mysql.createConnection({
			host : 'localhost',
			user : 'con_cars_portal',
			password : 'red340KHI($_',
			database : 'con_cars'
		});
		this.connection.connect();
		console.log('The connections has been created!');
	},

	close : function() {
		this.connection.end(function() {
			console.log('The connections has been closed!');
		});
	},

};

module.exports = MySQL;
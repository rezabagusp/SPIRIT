var Sequelize = require('sequelize');

module.exports = new Sequelize('spirit', 'postgres', 'gr1mr34p3r', {
	host: 'localhost',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		idle: 3600
	},
	timezone: '+07:00'
});
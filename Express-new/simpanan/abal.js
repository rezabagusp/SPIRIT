var connection = require('../dbsequlize'),
	Sequelize = require('sequelize');

var Abal = connection.define('uji coba', {
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	}
});

Abal.sync({
	force: true
}).then(() => {
	return User.create({
		firstName:'Parhan',
		lastName : 'Padly'
	});
});
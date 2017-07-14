var Sequelize = require('sequelize');

// module.exports = new Sequelize('spirit', 'postgres', 'gr1mr34p3r', {
// 	host: 'localhost',
// 	dialect: 'postgres',
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		idle: 3600
// 	},
// 	timezone: '+07:00'
// });

module.exports = new Sequelize('postgres://jwxamwzgphnagq:cd014e7bb9e67b700c2700852b0032b2c652b21fab739c504285f92027fbc40c@ec2-107-22-250-33.compute-1.amazonaws.com:5432/d536cs83ah360u');
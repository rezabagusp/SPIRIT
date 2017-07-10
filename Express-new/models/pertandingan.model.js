var sequelize = require('./../dbsequelize');
var departement = sequelize.import(__dirname + '/../models/departement.model');
var lomba = sequelize.import(__dirname + '/../models/lomba.model');
module.exports = function(sequelize, DataType) {
	return sequelize.define('pertandingan', {
		tempat_pertandingan: DataType.STRING,
		hari_pertandingan: DataType.DATEONLY,
		waktu_pertandingan: DataType.TIME,
		fk_lombaId: {
			type: DataType.INTEGER,
			references: {
				model: lomba,
				key: 'id'
			}
		},
		kontingen1: {
			type: DataType.INTEGER,
			references: {
				model: departement,
				key: 'id'
			}
		},
		kontingen2: {
			type: DataType.INTEGER,
			references: {
				model: departement,
				key: 'id'
			}
		}
	});
}
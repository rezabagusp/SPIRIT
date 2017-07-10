var sequelize = require('./../dbsequelize');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
var lomba = sequelize.import(__dirname + '/../models/lomba.model');
module.exports = function(sequelize, DataType) {
	return sequelize.define('peserta', {
		photodiri_peserta: DataType.STRING,
		photoKTM_peserta: DataType.STRING,
		noHP_peserta: DataType.STRING,
		SKL_peserta: {
			type: DataType.BOOLEAN,
			defaultValue: null
		},
		status_peserta: {
			type: DataType.BOOLEAN,
			defaultValue: false
		},
		fk_lombaId : DataType.INTEGER,
		// fk_lombaId: {
		// 	type: DataType.INTEGER,
		// 	references: {
		// 		model: lomba,
		// 		key: 'id'
		// 	}
		// },
		fk_mahasiswaId: {
			type: DataType.INTEGER,
			references: {
				model: mahasiswa,
				key: 'id'
			}
		}
	});
}
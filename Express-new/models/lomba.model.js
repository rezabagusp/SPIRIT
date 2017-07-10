var sequelize = require('./../dbsequelize');
var tangkai = sequelize.import(__dirname + '/../models/tangkailomba.model');
module.exports = function(sequelize, DataType) {
	return sequelize.define('lomba', {
		nama_lomba: DataType.STRING,
		min_lomba: DataType.INTEGER,
		max_lomba: DataType.INTEGER,
		fk_tangkaiId: {
			type: DataType.INTEGER,
			references: {
				model: tangkai,
				key: 'id'
			}
		}
	},{
		getterMethode: {
			getNama: ()=> {
				return this.getDataValue('nama_tangkai');
			}, getMin: ()=> {
				return this.getDataValue('min_lomba');
			}, getMax: ()=> {
				return this.getDataValue('max_lomba');
			}
		},setterMethode: {
			setNama: (nama)=> {
				return this.setDataValue('nama_tangkai', nama);
			}, setMin: (min)=> {
				return this.setDataValue('min_lomba', min);
			}, setMax: (max)=> {
				return this.setDataValuet('max_lomba', max);
			}
		}
	});
}
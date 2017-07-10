var sequelize = require('./../dbsequelize');
var kategori = sequelize.import(__dirname + '/../models/kategorilomba.model');
var panitia = sequelize.import(__dirname + '/../models/panitia.model');
module.exports = function(sequelize, DataType) {
	return sequelize.define('tangkailomba', {
		nama_tangkai: DataType.STRING,
		fk_kategoriId: {
			type: DataType.INTEGER,
			references: {
				model: kategori,
				key: 'id'
			}
		},
		fk_panitiaId: {
			type: DataType.INTEGER,
			references: {
				model: panitia,
				key: 'id',
				unique: true
			}
		}
	},{
		getterMethode: {
			getNama: ()=> {
				return this.getDataValue('nama_tangkai');
			}
		},setterMethode: {
			setNama: (nama)=>{
				return this.setDataValue('nama_tangkai', nama);
			}
		}
	});
}
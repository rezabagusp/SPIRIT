var sequelize = require('./../dbsequelize');
var divisipanitia = sequelize.import(__dirname + '/../models/divisipanitia.model');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
module.exports = function(sequelize, DataType){
	return sequelize.define('panitia',{
		username_panitia: DataType.STRING,
		password_panitia: DataType.STRING,
		email_panitia: {
			type: DataType.STRING, 
			unique: true, 
			isEmail: true
		},
		kediv_panitia: {
			type: DataType.BOOLEAN,
			defaultValue: false
		},
		status_panitia: {
			type: DataType.BOOLEAN,
			defaultValue: true
		},
		fk_divisiId: {
			type: DataType.INTEGER,
			references: {
				model: divisipanitia,
				key: 'id',
			}
		},
		fk_mahasiswaId: {
			type: DataType.INTEGER,
			references: {
				model: mahasiswa,
				key: 'id'
			}
		}
	},{
		getterMethode: {
			getUsername: ()=> {
				return this.getDataValue('username_panitia');
			}, getPassword: ()=> {
				return this.getDataValue('password_panitia');
			}, getEmail: ()=> {
				return this.getDataValue('email_panitia');
			}
		}, setterMethode: {
			setUsername: (username)=> {
				return this.setDataValue('username_panitia',username);
			}, setPassword: (password)=> {
				return this.setDataValue('password_panitia', password);
			}, setEmail: (email)=> {
				return this.setDataValue('email_panitia', email);
			}
		}
	});
}
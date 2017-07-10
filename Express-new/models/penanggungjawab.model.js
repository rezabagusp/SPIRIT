var sequelize = require('./../dbsequelize');
var departement = sequelize.import(__dirname + '/../models/departement.model');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
module.exports = function(sequelize, DataType) {
	return sequelize.define('pj',{
		username_pj: DataType.STRING,
		password_pj: DataType.STRING,
		email_pj: {
			type: DataType.STRING, 
			unique: true, 
			isEmail: true
		},
		telephone1_pj: {
			type: DataType.STRING, 
			isNumeric: true, 
			defaultValue: null
		},
		telephone2_pj: {
			type: DataType.STRING, 
			isNumeric: true, 
			defaultValue: null
		},
		status_pj: {
			type: DataType.BOOLEAN, 
			defaultValue: true
		},
		fk_departementId: {
			type: DataType.INTEGER,
			references: {
				model: departement,
				key: 'id'
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
		getterMethods: {
			getUsername: function(){
				return this.getDataValue('username_pj');
			},
			getPassword: function(){
				return this.getDataValue('password_pj');
			},
			getEmail: function(){
				return this.getDataValue('email_pj');
			},
			getTelephone1: function(){
				return this.getDataValue('telephone1_pj');
			},
			getTelephone2: function(){
				return this.getDataValue('telephone2_pj');
			}, 
			getStatus: function(){
				return this.getDataValue('status_pj');
			}
		},
		setterMethods: {
			setUsername: function(username){
				return this.setDataValue('username_pj', username);
			},
			setPassword: function(password){
				return this.setDataValue('password_pj', password);
			},
			setEmail: function(email){
				return this.setDataValue('email_pj', email);
			},
			setTelephone1: function(telephone1){
				return this.setDataValue('telephone1_pj', telephone1);
			},
			setTelephone2: function(telephone2){
				return this.setDataValue('telephone2_pj', telephone2);
			},
			setStatus: function(status){
				return this.setDataValue('status_pj', status);
			}
		}
	});
};
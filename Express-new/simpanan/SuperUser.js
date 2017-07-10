var db = require('../dbconnection'),
	crypto = require('crypto'),
	Mahasiswa = require('./Mahasiswa');

class SuperUser extends Mahasiswa{
	constructor(){
		super();
		this.username = '';
		this.password = '';
		this.email = '';
		
	}
	setUsername(username){
		this.username = username;
	}
	setPassword(password){
		//password dihashing 
		this.password = crypto.createHash('md5').update(password).digest('hex');
	}
	setEmail(email){
		this.email = email;
	}
	getEmail(callback){
		var query = "SELECT email_PJ FROM penanggung_jawab WHERE ?";
		var data = [{username: this.username}];
		db.query(query, data, callback);
	}
	getSuperUser(callback){
		var query = "SELECT * FROM penanggung_jawab WHERE ? and ?";
		var dataquery = [{username: this.username}, {password: this.password}];
		db.query(query ,dataquery ,callback);
	}
	resetPassword(callback){
		var query = "UPDATE penanggung_jawab SET ? WHERE username = ?";
		var dataquery = [{password: this.password}, this.username];
		db.query(query ,dataquery, callback);
	}
}

module.exports = SuperUser;
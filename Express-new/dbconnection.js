var mysql = require('mysql');
// masih dalam tahap penyempurnaan, masih terdapat error pada saat mengakses querynya.
// // class Connection{
// // 	constructor(){
// // 		this.pool = null;
// // 	}
// // 	setconnection(){
// // 		this.pool = mysql.createPool({
// // 			host:'localhost',
// // 			user: 'root',
// // 			password:'',
// // 			database:'psbo'
// // 		});
// // 	}
// // 	acquire(){
// // 		this.pool.getConnection();
// // 	}
// // }

// module.exports = new Connection();

var connection = mysql.createPool({
	host:'localhost',
	user: 'root',
	password:'',
	database:'psbo'
});
module.exports = connection;
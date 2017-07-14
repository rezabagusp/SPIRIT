var db = require('../dbconnection');

class Mahasiswa{
	constructor(){
		this.namaMahasiswa = '';
		this.nimMahasiswa = '';
		this.jumlahLomba='';
	}
	setMahasiswa(data){
		this.namaMahasiswa = data.namaMahasiswa;
		this.nimMahasiswa = data.nimMahasiswa;
	}
	getJumlahLomba(data, callback){
		this.setMahasiswa(data);
		var query = "SElECT jumlah_lomba FROM mahasiswa WHERE ?";
		var data = [{nim_mahasiswa: this.nimMahasiswa}];
		db.query(query, data, callback);
	}
}

module.exports = Mahasiswa;
var db = require('../dbconnection');

class Mahasiswa{
	constructor(){
		this.namaMahasiswa = '';
		this.nimMahasiswa = '';
		this.jumlahLomba='';
	}
	setNama(data){
		this.namaMahasiswa =  data.namaMahasiswa;
	}
	setNIM(data){
		this.nimMahasiswa = data.nimMahasiswa;
	}
	setMahasiswa(data){
		this.namaMahasiswa = data.namaMahasiswa;
		this.nimMahasiswa = data.nimMahasiswa;
	}
	getMahasiswa(callback){
		var query = "SElECT * FROM mahasiswa WHERE ? and ?";
		var data = [{nama_mahasiswa: this.namaMahasiswa}, {nim_mahasiswa:this.nimMahasiswa}];
		db.query(query, data, callback);
	}
	getJumlahLomba(data, callback){
		this.setMahasiswa(data);
		var query = "SElECT jumlah_lomba FROM mahasiswa WHERE ?";
		var data = [{nim_mahasiswa: this.nimMahasiswa}];
		db.query(query, data, callback);
	}
}

module.exports = Mahasiswa;
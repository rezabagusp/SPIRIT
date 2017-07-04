var SuperUser = require('./SuperUser');
var db = require('../dbconnection');

class Panitia extends SuperUser{
	constructor(){
	super();
	this.divisi = '';
	}
	setEmail(email){
		this.email = email;
	}
	getEmail(){
		return email;
	}
	verifikasiPeserta(data, callback){
		var query = "UPDATE peserta SET ? WHERE ?";
		var dataquery = [{status_peserta:1}, {id_peserta: data.params.id}];
		db.query(query, dataquery, callback);
	}
	unVerifikasiPeserta(data, callback){
		var query = "UPDATE peserta SET ? WHERE ?";
		var dataquery = [{status_peserta:2}, {id_peserta: data.params.id}];
		db.query(query, dataquery, callback);
	}
	// check apakah lomba sudah terdaftar atau belom
	checkLomba(data, callback) {
		var query = "SELECT * FROM lomba WHERE ?";
		var dataquery = [{nama_lomba:data.nama}];
		db.query(query, dataquery, callback);
	}
	// membuat lomba baru
	buatLomba(data, callback) {
		var query = "INSERT INTO lomba SET ?";
		var dataquery = [{id_lomba:'', nama_lomba:data.nama, kategori_lomba:data.kategori, tipe_lomba:data.tipe, minimal_peserta:data.min, maximal_peserta:data.max, juaraI_lomba:0, juaraII_lomba:0, juaraIII_lomba:0, pj_lomba:data.pj}];
		db.query(query, dataquery,callback);
	}
	// membuat jadwal pertandingan
	buatPertandingan(data, callback){
		var query = "INSERT INTO pertandingan SET ?";
		var dataquery = [{id_pertandingan: '', id_lomba: '', hari_pertandingan: '', waktu_pertandingan: '', tempat_pertandingan: '', kontingen1_pertandingan: '', kontingen2_pertandingan: '', jenis_pertandingan: ''}];
		db.query(query, dataquery, callback);
	}
	// menampilkan semua perserta yang belom diliat (dilakukan verifikasi)
	daftarPesertaBaru(data, callback){
		console.log("masuk");
		var query = "SELECT nama_mahasiswa, nim_mahasiswa, nama_departemen, nama_lomba, photo_peserta, photo_ktm_peserta FROM peserta join mahasiswa on idmahasiswa_peserta = id_mahasiswa join lomba on idlomba_peserta = id_lomba join departemen on fkdepartemen_mahasiswa = id_departemen  WHERE ?";
		var dataquery = [{status_peserta: 0}];
		db.query(query, dataquery, callback);
	}
	// menampilkan semua peserta
	daftarPesertaAll(data, callback){
		var query = "SELECT * FROM peserta";
		db.query(query, callback);
	}
	
}
module.exports = Panitia;
var SuperUser = require('./SuperUser'),
 	db = require('../dbconnection'),
 	nodemailer = require('nodemailer');

class PenanggungJawab extends SuperUser {
	constructor(){
		super();
		this.departemen = '';
		this.kontak = '';
	}
	setKontak(kontak){
		this.kontak = kontak;
	}
	setEmail(email){
		this.email = email;
	}
	listPeserta(data, callback){
		var query = "SELECT nama_mahasiswa, nim_mahasiswa, photo_peserta, photo_ktm_peserta, status_peserta FROM mahasiswa join peserta on idmahasiswa_peserta = id_mahasiswa join departemen on iddepartemen_mahasiswa = id_departemen WHERE ? and ?";
		var dataquery = [{idlomba_peserta:data.params.idlomba}, {iddepartemen_mahasiswa:data.params.iddept}];
		db.query(query, dataquery, callback);
	}
	editProfile(data, callback){
		//beranggapan bahwa suatu object yang login sudah disimpan di dalam session
		this.setPassword(data.password);
		var query = "UPDATE penanggung_jawab SET ? WHERE username = ?";
		var dataquery = [{passwrod: this.passwrod}, this.username]; 
		db.query(query, dataquery, callback);
	}
	checkLomba(data, callback){
		var query = "SELECT id_mahasiswa FROM mahasiswa WHERE ?";
		var dataquery = [{nim_mahasiswa: data.nimMahasiswa}];
		db.query(query, dataquery, function(err, hasil){
			var query = "SELECT * FROM peserta WHERE ? and ?";
			var dataquery = [{idmahasiswa_peserta: hasil[0].id_mahasiswa}, {idlomba_peserta:data.idLomba}];
			db.query(query, dataquery, callback);
		});
	}
	inputPerserta(data, callback){
		var query = "SELECT * FROM mahasiswa WHERE ?";
		var dataquery = [{nim_mahasiswa: data.body.nimMahasiswa}];
		db.query(query, dataquery, function(err, hasil){
			query = "INSERT INTO peserta SET ?";
			dataquery = [{id_peserta:'',idmahasiswa_peserta:hasil[0].id_mahasiswa , photo_peserta:data.files[0].path, photo_ktm_peserta:data.files[1].path, no_hp_peserta:data.body.noHp, idlomba_peserta:data.body.idLomba, status_peserta:0}];
			db.query(query, dataquery, function(err, hasil){
				console.log(err);
			});
			this.jumlahLomba = hasil[0].jumlah_lomba+1;
			query = "UPDATE mahasiswa SET ? WHERE ?";
			dataquery = [{jumlah_lomba: this.jumlahLomba}, {nim_mahasiswa: data.body.nimMahasiswa}];
			db.query(query, dataquery, callback);
		});
	}
	needhelp(data, callback) {
		var transport = nodemailer.createTransport({
			//service: 'gmail',
			host: 'smtp.gmail.com',
    		port: 465,
    		secure: true,
			auth: {
				user: 'miqdadfawwaz95@gmail.com',
				pass: 'akangaep10'
			}
		});

		//getEmail();
		// var email = this.email;
		var email = data.email;
		// nulis e-mail
		var mailOptions = {
			from: '"masih belom tau" <'+ email + '>', // sender
			to: 'miqdadfawwaz95@gmail.com', // receiver
			subject: data.judul,  // tittle
			text: data.isi
		};
		//ngirim
		transport.sendMail(mailOptions, (error, info) => {
			if(error) {
				console.log(error);
			}
			else {
				console.log('"masih belom tau" <'+ email + '>');
			}
		});
		var query = "UPDATE penanggung_jawab SET ? WHERE username = ?";
		var dataquery = [{password: this.password}, this.username];
		db.query(query ,dataquery, callback);
	}
}

module.exports = PenanggungJawab;
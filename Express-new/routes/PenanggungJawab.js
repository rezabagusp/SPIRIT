// halaman ini berisikan segala routing yang berhubungan dengan halaman
// atau apa saja yang dapat dilakukan oleh penanggung jawab.

var express = require('express'),
	router = express.Router(),
	path = require('path'),
	multer  = require('multer'),
	PenanggungJawab = require('../models/PenanggungJawab'),
	user = new PenanggungJawab,
	storage = multer.diskStorage({
	    destination: function (req, file, callback) {
	        callback(null, 'public/images');
	    },
	    filename: function (req, file, callback) {
	    let ext = path.extname(file.originalname);
	        callback(null, `${Math.random().toString(36).substring(7)}${ext}`);
	    }
	}),
	upload = multer({ storage : storage, 
		fileFilter: function (req, file, callback) {
			var belumTerdaftar = false;
			var jumlahLomba = 5;
			var ext = path.extname(file.originalname);
			if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(new Error('Only images are allowed'));
			}
			callback(null, true);
		}
	}).any();

//routing buat editprofile
router.post('/editprofile', function(req, res, next){
	user.editProfile(req.body, function(err, result){
		if(err == null){
			if(!result.length){
				res.json("Password tidak match!");
			}
			else{
				res.json(result);
			}
		}
		else{
			res.json('error');
		}
	});
});

// routing yang menghendel pendaftaran perserta
router.post('/daftarPeserta', function(req, res, next){
	upload(req, res, function(err) {
		var belumTerdaftar = false;
		var jumlahLomba = 5;
		if(err) {
			res.json(err);
		}
		else {
			user.getJumlahLomba(req.body, function(err, hasil){
			if(!hasil.length) {
				return res.json({status:1, message:"data mahasiswa tidak tersedia"});
			}
			jumlahLomba = hasil[0].jumlah_lomba;
				if(jumlahLomba < 5){
					user.checkLomba(req.body, function(err, hasil) {
						if(err)throw err;
						else if(!hasil.length) {
							belumTerdaftar = true;
						} else {
							belumTerdaftar = false;
						}
						if(belumTerdaftar) {
							user.inputPerserta(req, function(err, result){
								if(result != null){
									res.json("BERHASIL");
								}
								else{
									res.json("err");
								}
							});
						} else {
							return res.json({status:3, message:"Sudah terdaftar pada lomba yang sama"});
						}
					});	
				} else {
					res.json({status:2, message:"Sudah lebih dari 5 keikutsertaan"});
				}
			});
		}
	});
});

router.get('/listpeserta/:iddept/:idlomba', function(req, res, next){
	user.listPeserta(req, function(err, hasil){
		if(err) throw err;
		else {
			res.json(hasil);
		}
	});
});

router.post('/needhelp', function(req, res, next) {
	user.needhelp(req.body, function(err, hasil) {
		if(err) {
			res.json("err");
		} else {
			res.json("berhasil");
		}
	});
});


module.exports = router;
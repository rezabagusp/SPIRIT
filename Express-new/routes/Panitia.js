var express = require('express'),
	router = express.Router(),
	path = require('path');
	// multer  = require('multer'),
	Panitia = require('../models/Panitia'),
	user = new Panitia;

router.post('/buatlomba', function(req, res, next) {
	user.checkLomba(req.body, function(err, result) {
		if(err) throw err;
		if(result.length) {
			res.json("lomba sudah terdaftar");
		} else {
			user.buatLomba(req.body, function(err, result) {
				if(err) throw err;
				res.json(result);
			});		
		}
	});
});
//verifikasi perserta yang sudah terdaftar
router.post('/verifikasi/:id', function(req, res, next) {
	user.verifikasiPeserta(req, function(err, result) {
		if(err) throw err;
		if(result.changedRows == 0) {
			res.json("data kosong");
		} else {
			res.json("berhasil terverifikasi");
		}
	});
});
//unverifikasi perserta (gak lolos verifikasi)
router.post('/unverifikasi/:id', function(req, res, next) {
	user.unVerifikasiPeserta(req, function(err, result) {
		if(err) throw err;
		if(result.changedRows == 0) {
			res.json("data kosong");
		}
		else res.json("berhasil terverifikasi");
	});
});
//mengirimkan semua data peserta yang baru didaftarkan dan belum diverifikasi
router.get('/daftarPesertaBaru', function(req, res, next) {
	user.daftarPesertaBaru(req, function(err, hasil) {
		res.json(hasil);
	});
});

router.get('/daftarPesertaAll', function(req, res, next) {
	user.daftarPesertaAll(req, function(err, hasil) {
		res.json(hasil);
	});
});

module.exports = router;
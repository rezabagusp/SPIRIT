var express = require('express'),
	router = express.Router(),
	panitia = require('../controllers/panitia.controller'),
	user = new panitia;

router.get('/daftarPeserta', function(req, res, next) {
	user.daftarPeserta(req, res);
});

router.get('/daftarPesertaBaru', function(req, res, next) {
	user.daftarPesertaBaru(req, res);
});
router.get('/daftarTingkatAkhir', function(req, res, next) {
	user.daftarTingkatAkhir(req, res);
});
router.get('/daftarPesertaVerified', function(req, res, next) {
	user.daftarPesertaVerified(req, res);
});
router.post('/verifikasi/:id', function(req, res, next) {
	user.verifikasi(req, res);
});
router.post('/verifikasiTingkatAkhir/:id', function(req, res, next) {
	user.verifikasiTingkatAkhir(req, res);
});
router.post('/unverifikasi/:id', function(req, res, next) {
	user.unverifikasi(req, res);
});
router.post('/tambahkategori', function(req, res, next) {
	user.tambahKategori(req, res)
});
router.post('/tambahtangkai', function(req, res, next) {
	user.tambahTangkai(req, res);
});
router.post('/tambahlomba', function(req, res, next) {
	user.tambahLomba(req, res);
});

module.exports = router;
var express = require('express'),
	router = express.Router(),
	pj = require('../controllers/penanggungjawab.controller'),
	user = new pj;

router.post('/checkmahasiswa/:iddept', function(req, res, next) {
	console.log("masuk")
	user.checkmahasiswa(req, res);
});
router.post('/daftarpeserta', function(req, res, next){
	user.daftarpeserta(req, res);
});
router.get('/listpeserta/:iddept/:idlomba', function(req, res, next){
	user.listPeserta(req, res);
});
router.post('/updatepeserta/:idpes', function(req, res, next) {
	user.updatePeserta(req, res)
})
router.post('/deletepeserta/:idpes', function(req, res, next) {
	user.deletePeserta(req, res)
})

module.exports = router;
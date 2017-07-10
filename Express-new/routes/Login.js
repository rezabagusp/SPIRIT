// halaman ini bertujuan untuk routing segala
// sesuatu yang ada pada page login.

var express = require('express'),
	router = express.Router(),
	Login = require('../controllers/login.controller'),
	user = new Login;

//routing buat login
router.post('/masuk', function(req, res, next){
	user.login(req.body, res);
});
router.post('/reset', function(req, res, next){
	user.resetpassword(req.body, res);
});

module.exports = router;
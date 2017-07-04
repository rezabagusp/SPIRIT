// halaman ini bertujuan untuk routing segala
// sesuatu yang ada pada page login.

var express = require('express'),
	router = express.Router(),
	sequelize = require('../dbsequelize'),
	pj = sequelize.import(__dirname + '/../models/penanggungjawab.model'),
	panitia = sequelize.import(__dirname + '/../models/panitia.model'),
	jwt = require('jsonwebtoken'),
	crypto = require('crypto'),
	nodemailer = require('nodemailer'),
	random = require('randomstring');

class Login{
	constructor(){
		this.username = '';
		this.password = '';
		this.email = '';
	}
	/*fungsi hashing password*/
	setPassword(data){
		this.password = crypto.createHash('md5').update(data).digest('hex');
	}
	login(data, res){
		this.username = data.username;
		this.setPassword(data.password);
		pj.findOne({
			where: {
				username_pj: this.username,
				password_pj: this.password
			}
		}).then((hasilpj)=> {
			//bikin token untuk objek
			var token = jwt.sign(hasilpj.dataValues, 'secret_admire',{expiresIn: 4000});			
			//append status ke json kembalian
			res.json({status: true, message: "Authentication succeed, user found", token:token});
		}).catch((err)=>{
			panitia.findOne({
				where: {
					username_panitia: this.username,
					password_panitia: this.password
				}
			}).then((hasilpanitia) => {
				//bikin token untuk objek
				var token = jwt.sign(hasilpanitia.dataValues, 'secret_admire',{expiresIn: 4000});			
				//append status ke json kembalian
				res.json({status: true, message: "Authentication succeed, user found", token:token});
			}).catch((err) => {
	      		res.json({status: false, message: "Worng username or password", error: err});
			})
		});	
	}
	/*fungsi untuk reset password*/
	resetpassword(data, res){
		var status = 0;
		this.username = data.username;
		/*password di random*/
		var respass = random.generate(10);
		this.setPassword(respass);
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
		pj.findOne(
		{
			where: {
				username_pj: this.username
			},
			attributes: ['email_pj']
		}).then((user)=> {	
			this.email = user.email_pj;
			var mailOptions = {
				from: '"Panitia Spirit 2018" <miqdadfawwaz95@gmail.com>', // sender
				to: "rezabaguspermana.rbp@gmail.com", // receiver
				subject: 'Reset Password',  // tittle
				text: 'Saudara ' + this.email + ' dengan ini kami mengirimkan password baru yang telah anda request sebelumnya. Berikut ini adalah password baru anda = ' + respass
			};
			//ngirim
			transport.sendMail(mailOptions, (error, info) => {
				if(error) {
					console.log(error);
				}
				else {
					console.log("berhasil pj");
				}
			});
		}).catch(()=> {
			panitia.findOne({
				where: {
					username_panitia:this.username
				},
				attributes: ['email_panitia']
			}).then((Panitia) => {
				this.email = Panitia.email_panitia;
				var mailOptions = {
					from: '"Panitia Spirit 2018" <miqdadfawwaz95@gmail.com>', // sender
					to: "rezabaguspermana.rbp@gmail.com", // receiver
					subject: 'Reset Password',  // tittle
					text: 'Saudara ' + this.email + ' dengan ini kami mengirimkan password baru yang telah anda request sebelumnya. Berikut ini adalah password baru anda = ' + respass
				};
				//ngirim
				transport.sendMail(mailOptions, (error, info) => {
					if(error) {
						console.log(error);
					}
					else {
						console.log("berhasil");
					}
				});
			}).catch(() =>{
				res.json({status: false, message: "Username doesn't exist!"});
			})
		});		
		pj.update(
		{
			password_pj: this.password
		},
		{
			where: {
				username_pj: this.username
			}
		}).then(()=> {
			res.json({status: true, message:"Success reset your password!"});
		}).catch((err)=>{
			panitia.update({
				password_pj: this.password
			},{
				where: {
					username_panitia: this.username
				}
			}).then(() => {
				res.json({status: true, message:"Success reset your password!"});
			}).catch(() => {
				res.json({status:false, message:"Cant update your password!"});
			})
		});
	}
}

module.exports = Login;
var db = require('../dbconnection'),
	crypto = require('crypto'),
	random = require('randomstring'),
	Mahasiswa = require('./Mahasiswa'),
	nodemailer = require('nodemailer');

class SuperUser extends Mahasiswa{
	constructor(){
		super();
		this.username = '';
		this.password = '';
		this.email = '';
		
	}
	setUsername(username){
		this.username = username;
	}
	setPassword(password){
		//password dihashing 
		this.password = crypto.createHash('md5').update(password).digest('hex');
	}
	setEmail(email){
		this.email = email;
	}
	getEmail(){
		var query = "SELECT email FROM penanggung_jawab WHERE ?";
		var data = [{usernama_PJ: this.username}];
		db.query(query, data, function(err, hasil){
			if (err) throw err;
			else {
				this.setEmail(hasil);
			}
		});
	}
	login(data, callback){
		this.setUsername(data.username);
		this.setPassword(data.password);
		var query = "Select * from penanggung_jawab where username = ? and password = ?";
		var dataquery = [this.username, this.password];
		db.query(query ,dataquery ,callback);
	}
	resetPassword(data, callback){
		this.setUsername(data.username);
		//password dirandom
		var resetpass = random.generate(10);
		this.setPassword(resetpass);
		//mengirim password via email
		// setting smtp
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
		var email = 'muhamad.rofiq@gmail.com';
		// nulis e-mail
		var mailOptions = {
			from: '"Panitia Spirit 2018" <miqdadfawwaz95@gmail.com>', // sender
			to: email, // receiver
			subject: 'Reset Password',  // tittle
			text: 'Saudara ' + email + ' dengan ini kami mengirimkan password baru yang telah anda request sebelumnya. Berikut ini adalah password baru anda = ' + resetpass
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
		var query = "UPDATE penanggung_jawab SET ? WHERE username = ?";
		var dataquery = [{password: this.password}, this.username];
		db.query(query ,dataquery, callback);
	}
}

module.exports = SuperUser;
var sequelize = require('./../dbsequelize');
var panitia = sequelize.import(__dirname + '/../models/panitia.model');
panitia.sync().then(()=>{
	panitia.bulkCreate([{
		username_panitia:'panitia_kestari',
		password_panitia:'panitia_kestari',
		email_panitia:'panitia_kestari@gmail.com',
		status_panitia:'1',
		fk_divisiId:'1',
		fk_mahasiswaId:'9'
	}]);
});
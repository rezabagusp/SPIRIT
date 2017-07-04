var sequelize = require('./../dbsequelize');
var tangkailomba = sequelize.import(__dirname + '/../models/tangkailomba.model');
tangkailomba.sync().then(()=> {
	tangkailomba.bulkCreate([{
		nama_tangkai:'bola besar',
		fk_kategoriId:'1',
		fk_panitiaId:'1'
	},
	{
		nama_tangkai:'bola kecil',
		fk_kategoriId:'1',
		fk_panitiaId:'1'

	},
	{
		nama_tangkai:'music',
		fk_kategoriId:'2',
		fk_panitiaId:'1'
	}
	]);
});
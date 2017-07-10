var sequelize = require('./../dbsequelize');
var kategorilomba = sequelize.import(__dirname + '/../models/kategorilomba.model');
kategorilomba.sync().then(()=>{
	kategorilomba.bulkCreate([{
		nama_kategori:'olahraga'
	},
	{
		nama_kategori:'seni'
	}

	]);
});
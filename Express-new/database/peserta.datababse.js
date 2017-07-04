var sequelize = require('./../dbsequelize');
var peserta = sequelize.import(__dirname + '/../models/peserta.model');
peserta.sync().then(()=> {
	peserta.bulkCreate([{
		
	}]);
});
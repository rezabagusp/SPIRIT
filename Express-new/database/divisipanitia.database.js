var sequelize = require('./../dbsequelize');
var divisipanitia = sequelize.import(__dirname + '/../models/divisipanitia.model');
divisipanitia.sync().then(()=>{
	divisipanitia.bulkCreate([{
		nama_divisi:'kestari'
	}]);
});
var sequelize = require('./../dbsequelize');
var departement = sequelize.import(__dirname + '/../models/departement.model');
departement.sync().then(()=>{
	departement.bulkCreate([{
		nama_departement:'Statistika'
	},{
		nama_departement:'Geofisika dan Meteorologi'
	},{
		nama_departement:'Biologi'
	},{
		nama_departement:'Kimia'
	},{
		nama_departement:'Matematika'
	},{
		nama_departement:'Ilmu Komputer'
	},{
		nama_departement:'Fisika'
	},{
		nama_departement:'Biokimia'
	}]);
});
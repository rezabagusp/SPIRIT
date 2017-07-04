var sequelize = require('./../dbsequelize');
var lomba = sequelize.import(__dirname + '/../models/lomba.model');
lomba.sync().then(()=> {
	lomba.bulkCreate([{
		nama_lomba:'sepakbola',
		min_lomba:'23',
		max_lomba:'12',
		fk_tangkaiId:'1'

	},
	{
		nama_lomba:'sasket',
		min_lomba:'6',
		max_lomba:'12',
		fk_tangkaiId:'1'

	},
	{
		nama_lomba:'voli',
		min_lomba:'6',
		max_lomba:'15',
		fk_tangkaiId:'1'

	},
	{
		nama_lomba:'vocal group',
		min_lomba:'6',
		max_lomba:'15',
		fk_tangkaiId:'3'

	}
	]);
});
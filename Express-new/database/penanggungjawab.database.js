var sequelize = require('./../dbsequelize');
var pj = sequelize.import(__dirname + '/../models/penanggungjawab.model');
pj.sync().then(()=>{
	pj.bulkCreate([{
		username_pj:'pj_stk',
		password_pj:'stkjaya',
		email_pj:'stkjaya@gmail.com',
		telephone1_pj:'0823553702347',
		telephone2_pj:'0833412301243',
		status_pj:1,
		fk_departementId: 1
	},{
		username_pj:'pj_gfm',
		password_pj:'gfmjaya',
		email_pj:'gfmjaya@gmail.com',
		telephone1_pj:'093462719532',
		telephone2_pj:'082399346582',
		status_pj:1,
		fk_departementId: 2
	},{
		username_pj:'pj_bio',
		password_pj:'biojaya',
		email_pj:'biojaya@gmail.com',
		telephone1_pj:'083146372910',
		telephone2_pj:'083299311234',
		status_pj:1,
		fk_departementId: 3
	},{
		username_pj:'pj_kim',
		password_pj:'kimjaya',
		email_pj:'kimjaya@gmail.com',
		telephone1_pj:'081153720364',
		telephone2_pj:'083472416375',
		status_pj:1,
		fk_departementId: 4
	},{
		username_pj:'pj_mtk',
		password_pj:'mtkjaya',
		email_pj:'mtkjaya@gmail.com',
		telephone1_pj:'082341234753',
		telephone2_pj:'089218365321',
		status_pj:1,
		fk_departementId: 5
	},{
		username_pj:'pj_kom',
		password_pj:'komjaya',
		email_pj:'komjaya@gmail.com',
		telephone1_pj:'082341239835',
		telephone2_pj:'082199364428',
		status_pj:1,
		fk_departementId: 6
	},{
		username_pj:'pj_fis',
		password_pj:'fisjaya',
		email_pj:'fisjaya@gmail.com',
		telephone1_pj:'089931725748',
		telephone2_pj:'082194032712',
		status_pj:1,
		fk_departementId: 7
	},{
		username_pj:'pj_bik',
		password_pj:'bikjaya',
		email_pj:'bikjaya@gmail.com',
		telephone1_pj:'082194327465',
		telephone2_pj:'083164200234',
		status_pj:1,
		fk_departementId: 8
	}]);
});
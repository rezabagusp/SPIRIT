/*inisialisasi variable calon table*/
var sequelize = require('./../dbsequelize');
var departement = sequelize.import(__dirname + '/../models/departement.model');
var pj = sequelize.import(__dirname + '/../models/penanggungjawab.model');
var divisipanitia = sequelize.import(__dirname + '/../models/divisipanitia.model');
var panitia = sequelize.import(__dirname + '/../models/panitia.model');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
var kategorilomba = sequelize.import(__dirname + '/../models/kategorilomba.model');
var tangkailomba = sequelize.import(__dirname + '/../models/tangkailomba.model');
var lomba = sequelize.import(__dirname + '/../models/lomba.model');
var peserta = sequelize.import(__dirname + '/../models/peserta.model');
var pertandingan = sequelize.import(__dirname + '/../models/pertandingan.model');

/*create table*/
departement.sync().then(()=> {
	mahasiswa.sync().then(()=> {
		pj.sync();
		divisipanitia.sync().then(()=> {
			kategorilomba.sync();
			panitia.sync().then(()=> {
				tangkailomba.sync().then(()=> {
					lomba.sync().then(()=> {
						peserta.sync();
						pertandingan.sync();
					});
				});
			});
		});
	})
});
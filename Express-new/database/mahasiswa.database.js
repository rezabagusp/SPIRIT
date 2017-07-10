var sequelize = require('./../dbsequelize');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
mahasiswa.sync().then(()=> {
	mahasiswa.bulkCreate([{
		nama_mahasiswa: 'Parhan Zikkry Padly',
		NIM_mahasiswa: 'G64140011',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 3,
		fk_departementId: 6
	},
	{
		nama_mahasiswa: 'Reza bagus Permana',
		NIM_mahasiswa: 'G64140023',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 3,
		fk_departementId:6
	},
	{
		nama_mahasiswa: 'Feby Tri Saputra',
		NIM_mahasiswa: 'G64140047',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 4,
		fk_departementId: 6
	},
	{
		nama_mahasiswa: 'Miqdad A F',
		NIM_mahasiswa: 'G64140031',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 4,
		fk_departementId: 6
	},
	{
		nama_mahasiswa: 'Rizki Ananda Utama',
		NIM_mahasiswa: 'G64140030',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 3,
		fk_departementId: 6
	},
	{
		nama_mahasiswa: 'Raihan fajri',
		NIM_mahasiswa: 'G64140074',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 3,
		fk_departementId: 6
	},
	{
		nama_mahasiswa: 'Nisa Ayudiati',
		NIM_mahasiswa: 'G64140045',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 4,
		fk_departementId: 1
	},
	{
		nama_mahasiswa: 'Resti korea',
		NIM_mahasiswa: 'G64140034',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 4,
		fk_departementId: 1
	},
	{
		nama_mahasiswa: 'dhanada',
		NIM_mahasiswa: 'G64140009',
		jumlahlomba_mahasiswa: 0,
		tingkat_mahasiswa: 3,
		fk_departementId: 2
	}	

	]);
});
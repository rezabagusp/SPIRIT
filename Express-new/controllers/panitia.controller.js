var express = require('express'),
	router = express.Router(),
	sequelize = require('../dbsequelize'),
	Peserta = sequelize.import(__dirname + '/../models/peserta.model'),
	Mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model'),
	Departement = sequelize.import(__dirname + '/../models/departement.model'),
	Kategori = sequelize.import(__dirname + '/../models/kategorilomba.model'),
	Tangkai = sequelize.import(__dirname + '/../models/tangkailomba.model'),
	Lomba = sequelize.import(__dirname + '/../models/lomba.model'),
	panitia = sequelize.import(__dirname + '/../models/panitia.model');

Peserta.belongsTo(Mahasiswa, {foreignKey:'fk_mahasiswaId'});
Peserta.belongsTo(Lomba, {foreignKey: 'fk_lombaId'})
Mahasiswa.belongsTo(Departement, {foreignKey:'fk_departementId'});

class Panitia {

	daftarPesertaBaru(data, res) {
		Peserta.findAll({
			where: {
<<<<<<< HEAD
				status_peserta: null
=======
				status_peserta: false
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
			},
			attributes: ['id', 'photodiri_peserta', 'photoKTM_peserta', 'status_peserta', 'SKL_peserta'],
			include: [{
				model: Mahasiswa,
				where: {
					tingkat_mahasiswa: {
						$lt: 4
					}
				},
<<<<<<< HEAD
				attributes: ['id','nama_mahasiswa', 'NIM_mahasiswa'],
=======
				attributes: ['nama_mahasiswa', 'NIM_mahasiswa'],
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
				include: [{
					model: Departement,
					attributes: ['nama_departement']
				}]
			},
			{
				model: Lomba,
				attributes: ['nama_lomba']
			}]
		}).then((Peserta) => {
			res.json(Peserta)
		}).catch((err) => {
			console.log(err)
			res.json({status: false, message: "invalid query", error: err})
		})
	}

	daftarTingkatAkhir(data, res) {
		Peserta.findAll({
			where: {
<<<<<<< HEAD
				status_peserta:{
					$or:{
						$eq: null,
						$not: true
					}
				}
=======
				status_peserta: null
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
			},
			attributes: ['id', 'photodiri_peserta', 'photoKTM_peserta', 'status_peserta', 'SKL_peserta'],
			include: [
			{
				model: Mahasiswa,
				where: {
					tingkat_mahasiswa: {
						$gte: 4
					}
				},
<<<<<<< HEAD
				attributes: ['id','nama_mahasiswa', 'NIM_mahasiswa'],
=======
				attributes: ['nama_mahasiswa', 'NIM_mahasiswa'],
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
				include: [
				{
					model: Departement,
					attributes: ['nama_departement']
				}
				]
			},
			{
				model: Lomba,
				attributes: ['nama_lomba']
<<<<<<< HEAD
			}],
			order: [
				['fk_mahasiswaId']
			]
=======
			}]
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
		}).then((Peserta) => {
			res.json(Peserta)
		}).catch((err) => {
			console.log(err)
			res.json({status: false, message: "invalid query", error: err})
		})
	}

	daftarPesertaVerified(data, res) {
		Peserta.findAll({
			where: {
				status_peserta: true
			},
			attributes: ['id', 'photodiri_peserta', 'photoKTM_peserta', 'status_peserta', 'SKL_peserta'],
			include: [
			{
				model: Mahasiswa,
				where: {
					tingkat_mahasiswa: {
						$lte: 4
					}
				},
<<<<<<< HEAD
				attributes: ['id','nama_mahasiswa', 'NIM_mahasiswa'],
=======
				attributes: ['nama_mahasiswa', 'NIM_mahasiswa'],
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
				include: [{
					model: Departement,
					attributes: ['nama_departement']
				}]
			},
			{
				model: Lomba,
				attributes: ['nama_lomba']
			}]
		}).then((Peserta) => {
			res.json(Peserta)
		}).catch((err) => {
			console.log(err)
			res.json({status: false, message: "invalid query", error: err})
		})
	}
<<<<<<< HEAD
	/*verifikasi biasa*/
=======

>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
	verifikasi(data, res) {
		res.json(1);
		Peserta.update({
			status_peserta: true,
			SKL_peserta: true		
		},{
			where: {
<<<<<<< HEAD
				fk_mahasiswaId: data.params.id
			}
		})
	}
	/*verifikasi TA*/
=======
				id: data.params.id
			}
		})
	}
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
	verifikasiTingkatAkhir(data,res){
		res.json(1);
		Peserta.update({
			SKL_peserta: true		
		},{
			where: {
				id: data.params.id
			}
		})

	}
	unverifikasi(data, res) {
		res.json(1);
		Peserta.update({
			status_peserta: false,
			SKL_peserta: false		
		},{
			where: {
<<<<<<< HEAD
				fk_mahasiswaId: data.params.id
=======
				id: data.params.id
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
			}
		})
	}
	tambahKategori(data, res) {
		Kategori.bulkCreate([{
			nama_kategori: data.body.namakategori
		}])
	}
	tambahTangkai(data, res) {
		Tangkai.bulkCreate([{
			nama_tangkai: data.body.namatangkai,
			fk_kategoriId: data.body.kategoriId,
			fk_panitiaId: data.body.panitiaId
		}])
	}
	TambahLomba(data, res) {
		Lomba.bulkCreate([{
			nama_lomba: data.body.nama,
			min_lomba: data.body.min,
			max_lomba:data.body.max,
			fk_tangkaiId: data.body.tangkaiId
		}])
	}
}

module.exports = Panitia;
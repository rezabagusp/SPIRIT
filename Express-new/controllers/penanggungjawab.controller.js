var express = require('express'),
	router = express.Router(),
	path = require('path'),
	multer  = require('multer'),
	sequelize = require('../dbsequelize'),
	Mhs = sequelize.import(__dirname + '/../models/mahasiswa.model'),
	Peserta = sequelize.import(__dirname + '/../models/peserta.model'),
	storage = multer.diskStorage({
	    destination: function (req, file, callback) {
	        callback(null, 'public/images');
	    },
	    filename: function (req, file, callback) {
	    let ext = path.extname(file.originalname);
	        callback(null, `${Math.random().toString(36).substring(7)}${ext}`);
	    }
	}),
	upload = multer({ storage : storage, 
		fileFilter: function (req, file, callback) {
			var belumTerdaftar = false;
			var jumlahLomba = 5;
			var ext = path.extname(file.originalname);
			if(ext !== '.png' && ext !== '.PNG' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(new Error('Only images are allowed'));
			}
			callback(null, true);
		}
	}).any();
Peserta.belongsTo(Mhs, {foreignKey:'fk_mahasiswaId'});

class PJ {
	checkmahasiswa(data, res) {
		Peserta.findOne({
			include: {
				model: Mhs,
				where: {
					NIM_mahasiswa: data.body.NIM,
					fk_departementId: data.params.iddept
				},
				attributes: ['nama_mahasiswa', 'NIM_mahasiswa']
			},
			attributes: ['photodiri_peserta', 'photoKTM_peserta', 'noHP_peserta']
		}).then((hasil) => {
			hasil.dataValues.status = true
			res.json(hasil)
		}).catch(() => {
			Mhs.findOne({
				where: {
					NIM_mahasiswa: data.body.NIM,
					fk_departementId: data.params.iddept
				},
				attributes: ['nama_mahasiswa', 'NIM_mahasiswa']
			}).then((mahasiswa) => {
				mahasiswa.dataValues.status = false
				res.json(mahasiswa)
			}).catch(() => {
				res.json({status:null})
			})
		})
	}
	/*mendaftarkan peserta*/
	daftarpeserta(data, res) {
		upload(data, res, function(err) {
			console.log("data bodynya loh: ",data.body)
			var belumTerdaftar = false;
			var jumlahLomba = 5;
			if(err) {
				res.json(err);
			}
			else {
				Mhs.findOne({
					where: {
						nama_mahasiswa: data.body.namaMahasiswa,
						NIM_mahasiswa: data.body.nimMahasiswa
					},
					attributes: ['id', 'jumlahlomba_mahasiswa']
				}).then((MHS)=> {
					jumlahLomba = MHS.dataValues.jumlahlomba_mahasiswa;
					if(jumlahLomba < 5){
						Peserta.findOne({
							where: {
								fk_mahasiswaId: MHS.dataValues.id,
								fk_lombaId: data.body.idLomba
							},
							attributes: ['id']
						}).then((hasil) => {
							if(hasil === null){
								if(data.body.status == "true") {
								console.log("masuk ke true loh")
									Peserta.findOne({
										include: {
											model: Mhs,
											where: {
												NIM_mahasiswa: data.body.nimMahasiswa
											},
											attributes: ['id']
										},
										attributes: ['photodiri_peserta', 'photoKTM_peserta']
									}).then((namafile) => {
										Peserta.sync().then(() => {
											Peserta.create({
												photodiri_peserta:namafile.dataValues.photodiri_peserta,
												photoKTM_peserta:namafile.dataValues.photoKTM_peserta,
												noHP_peserta:data.body.noHp,
												fk_lombaId:data.body.idLomba,
												fk_mahasiswaId:MHS.dataValues.id		
											}).then(() => {
												jumlahLomba = jumlahLomba + 1
												Mhs.update({
													jumlahlomba_mahasiswa: jumlahLomba
												},{
													where: {
														id: MHS.dataValues.id
													}
												}).then(() =>{
													res.json("BERHASIL")
												})
											})
										})
									})
								} else {
									console.log("masuk ke false loh")
									Peserta.sync().then(()=> {
										Peserta.create({
											photodiri_peserta:data.files[0].path,
											photoKTM_peserta:data.files[1].path,
											noHP_peserta:data.body.noHp,
											fk_lombaId:data.body.idLomba,
											fk_mahasiswaId:MHS.dataValues.id
										}).then(() => {
											jumlahLomba = jumlahLomba + 1;
											Mhs.update({
												jumlahlomba_mahasiswa: jumlahLomba
											},{
												where: {id: MHS.dataValues.id}
											}).then(()=> {
												res.json("BERHASIL")
											})
										})
									});
								}
							} else {
								return res.status(200).send("3");//sudah terdaftar pada lomba yang sama
							}
						}).catch(()=>{
							console.log("masuk gak ada peserta");
						})
					} else {
						return res.status(200).send("2");//sudah lebih dari 5 keikutsertaan
					}
				}).catch(()=> {
					console.log("masuk 1")
					return res.status(200).send("1");//data mahasiswa tidak ditemukan
				});
			}
		});
	}
	/*list peserta perdepartement*/
	listPeserta(data, res){
		Peserta.findAll({
			where: {
				fk_lombaId: data.params.idlomba
			},
			attributes: ['id','photodiri_peserta', 'photoKTM_peserta', 'SKL_peserta', 'status_peserta', 'noHP_peserta'],
			include: [{
				model: Mhs,
				where: {
					fk_departementId: data.params.iddept		
				},
				attributes: ['nama_mahasiswa', 'NIM_mahasiswa', 'jumlahlomba_mahasiswa']
			}]
		}).then((PESERTA)=> {
			res.json(PESERTA);
		}).catch((err) => {
			console.log(err)
			res.json({status: false, message: "Invalid parameter lomba"});
		})
	}
	deletePeserta(data, res) {
		/*cara without join*/
		Peserta.findOne({
			where: {
				id: data.params.idpes
			},
			attributes: ['fk_mahasiswaId']
		}).then((hasil) => {
			Peserta.destroy({
				where: {
					id: data.params.idpes
				}
			}).then(() => {
				Mhs.findOne({
					where: {
						id: hasil.dataValues.fk_mahasiswaId
					},
					attributes: ['jumlahlomba_mahasiswa']
				}).then((jumlah) => {
					Mhs.update({
						jumlahlomba_mahasiswa: jumlah.dataValues.jumlahlomba_mahasiswa - 1
					},{
						where: {
							id: hasil.dataValues.fk_mahasiswaId
						}
					}).then(() => {
						res.json({status:true, message: "success"})
					}).catch(() => {
						res.json({status: false, message: "Gagal update jumlah lomba"})
					})	
				}).catch(() => {
					res.json({status: false, message: "Nama mahasiswa tidak ditemukan"})
				})
			}).catch(() => {
				res.json({status: false, message: "Gagal menghapus data peserta"})
			})
		}).catch(() => {
			res.json({status: false, message: "tidak dapat menemukan peserta"})
		})
	}
	updatePeserta(data, res) {

		upload(data, res, function(err) {
			console.log("bodynya",data.body)
			Peserta.findOne({
				where:{
					id: data.params.idpes
				},
				attributes: ['fk_mahasiswaId']
			}).then((idmahasiswa) => {
				Peserta.update({
					photodiri_peserta: data.files[0].path,
					photoKTM_peserta: data.files[1].path,
					noHP_peserta: data.body.noHp
				},{
					where: {
						fk_mahasiswaId: idmahasiswa.dataValues.fk_mahasiswaId
					}
				}).then(() => {
					res.json("BERHASIL")
				}).catch((err) => {
					res.json({status: false, message: "adaww"})
				})
			}).catch((err) => {
				console.log(err)
				res.json({status: false, message: "kcaoss"})
			})
		})
	}
}

module.exports = PJ;
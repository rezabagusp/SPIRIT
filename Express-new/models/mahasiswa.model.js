var sequelize = require('./../dbsequelize');
var departement = sequelize.import(__dirname + '/../models/departement.model');
module.exports = function(sequelize, DataType){
	return sequelize.define('mahasiswa',{
		nama_mahasiswa: DataType.STRING,
		NIM_mahasiswa: DataType.STRING,
		jumlahlomba_mahasiswa: DataType.INTEGER,
		tingkat_mahasiswa: {
			type: DataType.INTEGER,
			defaultValue: 0
		},
		fk_departementId: {
			type: DataType.INTEGER,
			references: {
				model: departement,
				key: 'id'
			}
		}
	},{
		getterMethode: {
			getNama: ()=> {
				return this.getDataValue('nama_mahasiswa');
			}, getNIM: ()=> {
				return this.getDataValue('NIM_mahasiswa');
			}, getJumlah: ()=> {
				return this.getDataValue('jumlahlomba_mahasiswa');
			},getTingkat: ()=> {
				return this.getDataValue('tingkat_mahasiswa');
			}
		}, setterMethode: {
			setNama: (nama)=> {
				return this.setDataValue('nama_mahasiswa',nama);
			}, setNIM: (NIM)=> {
				return this.setDataValue('NIM_mahasiswa', NIM);
			}, setJumlah: (jumlah)=> {
				return this.setDataValue('jumlahlomba_mahasiswa', jumlah);
			}, setTingkat: (tingkat)=> {
				return this.setDataValue('tingkat_mahasiswa', tingkat);
			}
		}
	});
}
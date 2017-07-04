module.exports = function(sequelize, DataType) {
	return sequelize.define('departement', {
		nama_departement: DataType.STRING
	},{
		getterMethode: {
			getNama: ()=> {
				return this.getDataValue('nama_departement');
			}
		},setterMethode: {
			setNama: (nama)=>{
				return this.setDataValue('nama_departement', nama);
			}
		}
	});
}
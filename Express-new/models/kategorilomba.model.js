module.exports = function(sequelize, DataType) {
	return sequelize.define('kategorilomba', {
		nama_kategori: DataType.STRING
	},{
		getterMethode: {
			getNama: ()=> {
				return this.getDataValue('nama_kategori');
			}
		},setterMethode: {
			setNama: (nama)=>{
				return this.setDataValue('nama_kategori', nama);
			}
		}
	});
}
module.exports = function(sequelize, DataType){
	return sequelize.define('divisipanitia',{
		nama_divisi: DataType.STRING
	},{
		getterMethode: {
			getNama: ()=> {
				return this.getDataValue('nama_divisi');
			}
		}, setterMethode: {
			setNama: (nama)=> {
				return this.setDataValue('nama_divisi',nama);
			}
		}
	});
}
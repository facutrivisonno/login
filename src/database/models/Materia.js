module.exports = (sequelize,dataTypes) => {
    let alias = "Materias";

    let cols = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre :{
            type : dataTypes.STRING
        },
        cuatrimestre :{
            type : dataTypes.STRING
        },
        cargaHoraria :{
            type : dataTypes.INTEGER
        },
    }
    
    let config = {
        tableName: "materia",
        timestamps: false
    }

    const Materia = sequelize.define(alias, cols , config);
    return Materia;

}
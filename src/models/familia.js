const { DataTypes } = require('sequelize')
const  sequelize  = require('../db/db')

const Familia = sequelize.define('Familia', {
    idFamilia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    createdDate: DataTypes.DATE,
    updatedDate: DataTypes.DATE,
    },
    {
        tableName: 'familia',
        timestamps: false
    })
     
    module.exports = Familia


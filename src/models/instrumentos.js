const { DataTypes } = require('sequelize')
const  sequelize  = require('../db/db')

const Instrumentos = sequelize.define('instrumentos', {
    idInstrumento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER(8),
        allowNull: false
    },
    createdDate: DataTypes.DATE,
    updatedDate: DataTypes.DATE,
    },
    {
        tableName: 'instrumento',
        timestamps: false
    })
     
    module.exports = Instrumentos


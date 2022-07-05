const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const TipoInstrumento = sequelize.define('TipoInstrumento', {
  idTipoInstrumento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  idFamilia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdDate: DataTypes.DATE,
  updatedDate: DataTypes.DATE
},
{
  tableName: 'tipo_Instrumento',
  timestamps: false
})

module.exports = TipoInstrumento

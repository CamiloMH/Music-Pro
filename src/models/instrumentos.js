const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Instrumentos = sequelize.define('Instrumentos', {
  idInstrumento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  precio: {
    type: DataTypes.INTEGER(8),
    allowNull: false
  },
  idTipoInstrumento: {
    type: DataTypes.INTEGER
  },
  createdDate: DataTypes.DATE,
  updatedDate: DataTypes.DATE
},
{
  tableName: 'instrumento',
  timestamps: false
})

module.exports = Instrumentos

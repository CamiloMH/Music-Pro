const Instrumentos = require('../models/instrumentos')
const Familia = require('../models/familia')
const TipoInstrumento = require('../models/tipoInstrumento')

Familia.hasMany(TipoInstrumento, { foreignKey: 'idFamilia' })
TipoInstrumento.belongsTo(Familia, { foreignKey: 'idFamilia' })

TipoInstrumento.hasMany(Instrumentos, { foreignKey: 'idTipoInstrumento' })
Instrumentos.belongsTo(TipoInstrumento, { foreignKey: 'idTipoInstrumento' })

module.exports = {
  models:
  Instrumentos,
  Familia,
  TipoInstrumento
}

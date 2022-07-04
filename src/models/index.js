const Instrumento = require('../models/instrumentos');
const Familia = require('../models/familia');
const TipoInstrumento = require('../models/tipoInstrumento');

Familia.hasMany(TipoInstrumento, { foreignKey: 'idFamilia' });
TipoInstrumento.belongsTo(Familia, { foreignKey: 'idFamilia' });

TipoInstrumento.hasMany(Instrumento, { foreignKey: 'idTipoInstrumento' });
Instrumento.belongsTo(TipoInstrumento, { foreignKey: 'idTipoInstrumento' });

module.export = {
    models: {
        Instrumento,
        Familia
    }
}
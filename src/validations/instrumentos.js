const { check } = require('express-validator')
const validateResults = require('../middlewares/handleValidator')
const { buscarPorIdInstrumento, validarPrecio, buscarPorTipoInstrumento, validarModeloExiste } = require('../utils/validationCustom')

const idInstrumento = [
  check('idInstrumento')
    .exists()
    .withMessage('El idInstrumento es requerido')
    .isLength({ min: 1, max: 4 })
    .withMessage('El idInstrumento debe tener entre 1 y 4 caracteres')
    .custom((value, { req }) => buscarPorIdInstrumento(value)),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validacionCrearInstrumento = [
  check('marca')
    .notEmpty()
    .withMessage('La marca es requerida')
    .exists()
    .withMessage('La marca es requerida')
    .isLength({ min: 1, max: 50 })
    .withMessage('La marca debe tener entre 1 y 50 caracteres'),
  check('modelo')
    .notEmpty()
    .withMessage('El modelo no puede ser vacio')
    .exists()
    .withMessage('El modelo es requerido')
    .isLength({ min: 1, max: 50 })
    .withMessage('El modelo debe tener entre 1 y 50 caracteres')
    .custom((value, { req }) => validarModeloExiste(value)),
  check('precio')
    .notEmpty()
    .withMessage('El precio es requerido')
    .exists()
    .withMessage('El precio es requerido')
    .custom((value, { req }) => validarPrecio(value)),
  check('idTipoInstrumento')
    .notEmpty()
    .withMessage('El idTipoInstrumento es requerido')
    .exists()
    .withMessage('El idTipoInstrumento es requerido')
    .custom((value, { req }) => buscarPorTipoInstrumento(value)),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validacionActualizarInstrumento = [
  check('marca')
    .notEmpty()
    .withMessage('La marca es requerida')
    .exists()
    .withMessage('La marca es requerida')
    .isLength({ min: 1, max: 50 })
    .withMessage('La marca debe tener entre 1 y 50 caracteres'),
  check('modelo')
    .notEmpty()
    .withMessage('El modelo no puede ser vacio')
    .exists()
    .withMessage('El modelo es requerido')
    .isLength({ min: 1, max: 50 })
    .withMessage('El modelo debe tener entre 1 y 50 caracteres')
    .custom((value, { req }) => validarModeloExiste(value, req.params.idInstrumento)),
  check('precio')
    .notEmpty()
    .withMessage('El precio es requerido')
    .exists()
    .withMessage('El precio es requerido')
    .custom((value, { req }) => validarPrecio(value)),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = {
  idInstrumento,
  validacionCrearInstrumento,
  validacionActualizarInstrumento
}

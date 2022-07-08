const { validationResult } = require('express-validator')

const validateResults = (req, res, next) => {
  const errores = validationResult(req)
  const err = []
  for (const error of errores.array()) {
    err.push(error.msg)
  }

  if (!errores.isEmpty()) {
    return res.status(400).json({
      Error: err
    })
  }

  next()
}

module.exports = validateResults

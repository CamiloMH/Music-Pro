const handleError = (err, code, res) => {
  res.status(code).json(err)
}

module.exports = { handleError }

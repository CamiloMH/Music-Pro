const app = require('./src/app')
const sequelize = require('./src/db/db')
// const models = require('./src/models/index')
const PORT = process.env.PORT || 3000

// Iniciar servidor
const server = app.listen(PORT, async () => {
  try {
    // FORCE true: DROP TABLE
    await sequelize.sync({ force: false, alter: true })
    console.log('Conexion de base de datos exitosa')
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})

module.exports = {
  server
}

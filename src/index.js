const app = require('./app')
const sequelize = require('./db/db')
const models = require('./models/index')
const PORT = process.env.PORT || 3000

// Iniciar servidor
app.listen(PORT, async () => { 
    try {
        // FORCE true: DROP TABLE
        await sequelize.sync({ force: false, alter: true })
        console.log('Conexion de base de datos exitosa');
        console.log(`Servidor corriendo en el puerto ${PORT}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

const { Sequelize } = require('sequelize')

const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mariadb',
  logging: false
})

module.exports = sequelize

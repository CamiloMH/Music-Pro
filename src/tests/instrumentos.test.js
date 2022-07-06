/* eslint-env jest */
const app = require('../app')
const sequelize = require('../db/db')
const { server } = require('../../index')
const supertest = require('supertest')
const { Familia, TipoInstrumento } = require('../models/index')
const Instrumentos = require('../models/instrumentos')
const { familia, tiposInstrumentos, instrumentos, newInstrumento } = require('./util/data')

const api = supertest(app)

beforeEach(async () => {
  // Eliminar datos de la base de datos
  await sequelize.sync({ force: true, alter: true })

  // Insertar familia de instrumentos
  await Familia.create(familia)

  // Insertar tipos de instrumentos
  for (const tipoInstrumento of tiposInstrumentos) {
    await TipoInstrumento.create(tipoInstrumento)
  }

  // Insertar instrumentos
  for (const instrumento of instrumentos) {
    await Instrumentos.create(instrumento)
  }
})

// jest.setTimeout(30000)

describe('GET:', () => {
  test('deberia llegar un codigo 200', async () => {
    await api.get('/api/instrumentos')
      .expect(200)
  })

  test('deberia responder con un JSON', async () => {
    await api.get('/api/instrumentos')
      .expect('Content-Type', /json/)
  })

  test('deberia responder con un array', async () => {
    await api.get('/api/instrumentos')
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array)
      }
      )
  })

  test('deberia responder con un array con 2 instrumentos', async () => {
    const response = await api.get('/api/instrumentos')
    expect(response.body.length).toBe(2)
  })

  test('el instrumento debe tener la marca "Ibanez"', async () => {
    const response = await api.get('/api/instrumentos')
    expect(response.body[0].marca).toBe('Ibanez')
  })

  test('deberia responder con un object', async () => {
    const response = await api.get('/api/instrumentos/1')
    expect(response.body).toBeInstanceOf(Object)
  })

  test('deberia responder con un instrumento con el id 1', async () => {
    const response = await api.get('/api/instrumentos/1')
    expect(response.body.idInstrumento).toBe(1)
  })
})

describe('POST:', () => {
  test('deberia llegar un codigo 201', async () => {
    await api.post('/api/instrumentos')
      .send(newInstrumento)
      .expect(201)
  })

  test('deberia responder con 3 instrumentos', async () => {
    await api.post('/api/instrumentos')
      .send(newInstrumento)

    const response = await api.get('/api/instrumentos')
    expect(response.body.length).toBe(3)
  })

  test('deberia llegar un codigo 403', async () => {
    await api.post('/api/instrumentos')
      .send(instrumentos[0])
      .expect(403)
  })

  test('deberia llegar un error de que el modelo ya existe', async () => {
    const response = await api.post('/api/instrumentos')
      .send(instrumentos[0])
      .expect(403)
    expect(response.body.errors[0].msg).toBe('El modelo ya existe')
  })

  test('deberia llegar un error de que el modelo no puede ser vacio', async () => {
    const response = await api.post('/api/instrumentos')
      .send({
        marca: 'Ibanez',
        modelo: '',
        precio: 1000000,
        idTipoInstrumento: 1
      })
      .expect(403)
    expect(response.body.errors[0].msg).toBe('El modelo no puede ser vacio')
  })

  test('deberia llegar un error de que el tipo de instrumento es requerido', async () => {
    const response = await api.post('/api/instrumentos')
      .send({
        marca: 'Ibanez',
        modelo: 'modelo',
        precio: 1000000
      })
      .expect(403)
    expect(response.body.errors[0].msg).toBe('El idTipoInstrumento es requerido')
  })

  test('deberia llegar un error de que el precio debe ser un número', async () => {
    const response = await api.post('/api/instrumentos')
      .send({
        marca: 'Ibanez',
        modelo: 'modelo',
        precio: 'precio',
        idTipoInstrumento: 1
      })
      .expect(403)
    expect(response.body.errors[0].msg).toBe('El precio debe ser un número')
  })
})

describe('PUT:', () => {
  test('deberia llegar un codigo 200', async () => {
    await api.put('/api/instrumentos/1')
      .send(instrumentos[0])
      .expect(200)
  })

  test('deberia actualizar el precio 1000000 a 20000', async () => {
    await api.put('/api/instrumentos/1')
      .send({ ...instrumentos[0], precio: 20000 })

    const response = await api.get('/api/instrumentos/1')
    expect(response.body.precio).toBe(20000)
  })

  test('deberia llegar un error de Instrumento no encontrado', async () => {
    const response = await api.put('/api/instrumentos/3')
      .send(instrumentos[0])
      .expect(403)
    expect(response.body.errors[0].msg).toBe('Instrumento no encontrado')
  })
})

describe('DELETE:', () => {
  test('deberia llegar un codigo 200', async () => {
    await api.delete('/api/instrumentos/1')
      .expect(200)
  })

  test('deberia responder con un array con 1 instrumento', async () => {
    await api.delete('/api/instrumentos/1')

    const response = await api.get('/api/instrumentos')
    expect(response.body.length).toBe(1)
  })

  test('deberia llegar un error de Instrumento no encontrado', async () => {
    const response = await api.delete('/api/instrumentos/3')
      .expect(403)
    expect(response.body.errors[0].msg).toBe('Instrumento no encontrado')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})

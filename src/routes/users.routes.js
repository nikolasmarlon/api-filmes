const { Router } = require('express')

const UsersController = require('../controllers/UsersController') // classe precisa ser instânciada

//Inicializando Router()
const usersRoutes = Router()

const usersController = new UsersController()

// A rota vai receber a requisição e a resposta e repassar para o controller
usersRoutes.post("/",  usersController.create)

module.exports = usersRoutes
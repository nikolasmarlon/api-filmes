const { Router } = require('express')

const UsersController = require('../controllers/UsersController') // classe precisa ser instânciada

//Inicializando Router()
const usersRoutes = Router()



const usersController = new UsersController()

// A rota vai receber a requisição e a resposta e repassar para o controller
usersRoutes.post("/", usersController.create) // a rota tem o endereço, o middleware e o controller, ( antes do executar o controller, tudo vai passar pelo middleware)
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes
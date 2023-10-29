const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController') // classe precisa ser instânciada

//Inicializando Router()
const movieRoutes = Router()



const movieNotesController = new MovieNotesController()

// A rota vai receber a requisição e a resposta e repassar para o controller
movieRoutes.post("/:user_id", movieNotesController.create) // a rota tem o endereço, o middleware e o controller, ( antes do executar o controller, tudo vai passar pelo middleware)


module.exports = movieRoutes
const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController') // classe precisa ser instânciada

//Inicializando Router()
const movieRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const movieNotesController = new MovieNotesController()

movieRoutes.use(ensureAuthenticated)// Passar Middleware para todas as rotas 

// A rota vai receber a requisição e a resposta e repassar para o controller
movieRoutes.post("/", movieNotesController.create) 
movieRoutes.get("/:id", movieNotesController.show) 
movieRoutes.delete("/:id", movieNotesController.delete) 
movieRoutes.get("/", movieNotesController.index) // nao precisa informar o id, pq estamos usando query


module.exports = movieRoutes
const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController') // classe precisa ser instânciada

//Inicializando Router()
const movieRoutes = Router()



const movieNotesController = new MovieNotesController()

// A rota vai receber a requisição e a resposta e repassar para o controller
movieRoutes.post("/:user_id", movieNotesController.create) 
movieRoutes.get("/:id", movieNotesController.show) 
movieRoutes.delete("/:id", movieNotesController.delete) 
movieRoutes.get("/", movieNotesController.index) // nao precisa informar o id, pq estamos usando query


module.exports = movieRoutes
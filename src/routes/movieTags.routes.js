const { Router } = require('express')

const MovieTagsController = require('../controllers/MovieTagsController') // classe precisa ser instânciada

//Inicializando Router()
const movieTagsRoutes = Router()



const movieTagsController = new MovieTagsController()

movieTagsRoutes.get("/:user_id", movieTagsController.index) // nao precisa informar o id, pq estamos usando query


module.exports = movieTagsRoutes
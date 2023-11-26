const { Router } = require('express')

const MovieTagsController = require('../controllers/MovieTagsController') // classe precisa ser instânciada

//Inicializando Router()
const movieTagsRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const movieTagsController = new MovieTagsController()

movieTagsRoutes.get("/",ensureAuthenticated,  movieTagsController.index) 


module.exports = movieTagsRoutes
const { Router } = require('express')

const userRoutes = require('./users.routes')
const movieRoutes = require('./movie.routes')

const routes = Router()



// Reunir todas as rotas para facilitar na importação em outros arquivos
routes.use('/users', userRoutes )
routes.use('/movie', movieRoutes )


module.exports = routes
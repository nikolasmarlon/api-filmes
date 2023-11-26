const { Router } = require('express')

const userRoutes = require('./users.routes')
const movieRoutes = require('./movie.routes')
const movieTagsRoutes = require('./movieTags.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()



// Reunir todas as rotas para facilitar na importação em outros arquivos
routes.use('/users', userRoutes )
routes.use('/sessions', sessionsRoutes )
routes.use('/movie', movieRoutes )
routes.use('/tags', movieTagsRoutes )


module.exports = routes
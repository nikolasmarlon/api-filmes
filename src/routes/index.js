const { Router } = require('express')

const userRoutes = require('./users.routes')

const routes = Router()



// Reunir todas as rotas para facilitar na importação em outros arquivos
routes.use('/users', userRoutes )


module.exports = routes
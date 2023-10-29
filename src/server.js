/**
 *  
 *  server ->  Ponto de entrada = quando a requisição chega vai para as rotas
 *  /routes ->  rotas vai identificar qual é o cotroller que vai ser executado (baseado na rota)
 *  /controllers -> Controller vai executar essa requisição, depois devolve para a rota, e a rota sabe para quem tem que devolver a resposta atravez do server js
 *  /utils ->
 *  /database -> sqlite -> migrations
 * 
 * 
 */

require('express-async-errors')
const AppError = require('./utils/AppError')
const express = require('express')
const routes = require('./routes')


// const database = require('./database/sqlite')
const migrationsRun = require('./database/sqlite/migrations')

migrationsRun()

const app = express() // Inicializando express

app.use(express.json()) // Avisar que os dados serão passados em json


app.use(routes) // pegar as rotas que vem do index.js em ./routes




// para usar o express-async-errors
app.use( (error, request, response, next) => {

    // se é um erro pelo lado do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    // para debugar
    console.error(error)

    // se o erro nao for do cliente, então retorna um erro padrão
    return response.status(500).json({
        status: 'error',
        message: "Internal server error"
    })
})


const PORTA = 3333
app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))
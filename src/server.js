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



const express = require('express')


const routes = require('./routes')



const app = express() // Inicializando express

app.use(express.json()) // Avisar que os dados serão passados em json


app.use(routes) // pegar as rotas que vem do index.js em ./routes








const PORTA = 3333
app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))
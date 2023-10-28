const express = require('express')


const app = express() // Inicializando express


app.get("/mensagem/:id/:user", (request, response) => {
    response.send(`Olá, mundo! ${request.params.id}, para o usuário : ${request.params.user}`)
})









const PORTA = 3333
app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))
const express = require('express')


const app = express() // Inicializando express


app.get("/mensagem/:id/:user", (request, response) => {

    const {id, user} = request.params

    response.send(`Olá, mundo! ${id}, para o usuário : ${user}`)
})









const PORTA = 3333
app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))
const express = require('express')


const app = express() // Inicializando express


app.get("/mensagem/:id/:user", (request, response) => {

    const {id, user} = request.params

    response.send(`Olá, mundo! ${id}, para o usuário : ${user}`) // Route params === são obrigatórios
})



app.get("/users", (requisicao, resposta) => {
    const { pagina, limite} = requisicao.query

    resposta.send(`Página: ${pagina}, limite: ${limite}`) //Query Params === opcional exemplo rota no navegador http://localhost:3333/users?pagina=4&&limite=10
})







const PORTA = 3333
app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))
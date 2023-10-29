const express = require('express')


const app = express() // Inicializando express

app.use(express.json()) // Avisar que os dados serão passados em json


app.post("/users", (requisicao, resposta) => {
    
    const {nome, email, senha} = requisicao.body

   // resposta.send(`Usuário: ${nome} -- E-mail: ${email}, senha: ${senha}`) // Devolve um html
    resposta.json( {nome, email, senha}) // Devolve um objeto json
})







const PORTA = 3333
app.listen(PORTA, () => console.log(`Porta: ${PORTA}`))
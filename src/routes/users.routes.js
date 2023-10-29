const { Router } = require('express')

//Inicializando Router()
const userRoutes = Router()


userRoutes.post("/", (requisicao, resposta) => {
    
    const {nome, email, senha} = requisicao.body

   // resposta.send(`Usuário: ${nome} -- E-mail: ${email}, senha: ${senha}`) // Devolve um html
    resposta.json( {nome, email, senha}) // Devolve um objeto json
})

module.exports = userRoutes
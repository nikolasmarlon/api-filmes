const { Router } = require('express')

const UsersController = require('../controllers/UsersController') // classe precisa ser instânciada

//Inicializando Router()
const usersRoutes = Router()


//Duas formas de usar o middleware
// 1ª Passar para cada rota para interceptar a requisição e a resposta e o next
// 2ª Segunda forma é passando para todas as rotas 
function meuMiddleware(requisicao, resposta, next){
    console.log('voce passou pelo middleware')
    console.log(requisicao.body)

    if(!requisicao.body.isAdmin){
        return resposta.json({ mensagem: "Usuário nao altorizado!"})
    }
    next()
}

usersRoutes.use(meuMiddleware)

const usersController = new UsersController()

// A rota vai receber a requisição e a resposta e repassar para o controller
usersRoutes.post("/", usersController.create) // a rota tem o endereço, o middleware e o controller, ( antes do executar o controller, tudo vai passar pelo middleware)

module.exports = usersRoutes
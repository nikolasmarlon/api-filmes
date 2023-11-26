
// função do JWT
const { verify } = require('jsonwebtoken')

const AppError = require('../utils/AppError')

// buscar as configurações do JWT
const authConfig = require('../configs/auth')


// Middleware sempre recebe next para chamar a próxima função destino da requisição
function ensureAuthenticated(request, response, next){

    // o token vai ficar dento do cabeçalho da requisição
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401)
    }

    // Acessar atravéz de um vetor o que está dentro do Header
    // Fazer um split na string para separar por expaço vazio ( Pegando a segunda posição do array)
    const [, token] = authHeader.split(" ")

    try{

       const { sub: user_id } = verify(token, authConfig.jwt.secret)// Se token verdadeiro, então devolve um sub ( convertido(apelido ( alias )) para user_id )

       //Criar uma propriedade dentro da requisição que nao existe ainda ( chamada user e dentro um id que recebe user_id convertido para number)
       request.user = {
        id: Number(user_id)
       }

       return next() // para charmar a próxima função

    }catch{
        throw new AppError("JWT Token inválido", 401)
    }

}

module.exports = ensureAuthenticated
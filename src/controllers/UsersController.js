// classe permite termos várias funções, porém nao vamos por mais que 5 funções ( métodos )
// Existe um padrão que é uma boa prática de usarmos somente 5 métodos em cada controller

/**
 *      _____ Métodos _____
 * 
 *  Primeira: - index ( GET ) Para listar registros.
 * 
 *  Segundo: - show - ( GET ) Para exibir um registro específico
 * 
 *  Terceiro: - create - ( POST ) Para criar um registro
 * 
 *  Quarto: - update - ( PUT ) Para atualizar um registro
 * 
 *  Quinto: - delete - ( DELETE ) Para remover um registro
 * 
 *  OBS: GET, POST, PUT, DELETE => SÃO VERBOS HTTP ( OU MÉTODOS HTTP)
 *  OBS: Se for preciso mais que cinco métods, é uma boa prática criar outro controller
 */

const AppError = require('../utils/AppError')

class UsersController {


    //Métodos ( função )
    create(requisicao, resposta){
        const {nome, email, senha} = requisicao.body

        if(!nome){
            throw new AppError("Informe um nome", )
        }

        // resposta.send(`Usuário: ${nome} -- E-mail: ${email}, senha: ${senha}`) // Devolve um html
        resposta.json( {nome, email, senha}) // Devolve um objeto json
    }
}

module.exports = UsersController
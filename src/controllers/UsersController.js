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

const sqliteConnection = require('../database/sqlite')

class UsersController {

    //Métodos ( função )
    // transformar em uma função async para poder usar o await e conectar com banco de forma assíncrona
    async create(requisicao, resposta){
        const {nome, email, senha} = requisicao.body
        const database = await sqliteConnection()

        //verificar se o email já existe
        const checkUserExists = await database.get("select * from users where email = (?)", [email])

        if(checkUserExists){
            throw new AppError("E-mail em uso")
        }

        await database.run("insert into users (name, email, password) values (?, ?, ?) ", [nome, email, senha])

        return resposta.status(201).json()

    }   
}

module.exports = UsersController
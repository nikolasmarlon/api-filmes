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


const { hash } = require('bcryptjs')
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

        const senhaCriptografada = await hash(senha, 8)

        await database.run("insert into users (name, email, password) values (?, ?, ?) ", [nome, email, senhaCriptografada])

        return resposta.status(201).json()

    }   

    async update(request, response){
        const {nome, email} = request.body // pegar nome e email do corpo da requisição
        const { id } = request.params // pegar o id pelo parâmetro, passado na url

        // criar conexão com banco
        const database = await sqliteConnection()
        // pegar o usuário
        const user = await database.get("select * from users where id = (?)", [id])

        // verificar se o usuário existe
        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        // busca pelo email
        const userWithUpdatedEmail = await database.get("select * from users where email = (?)", [email])
        
        // verificar se o email já está em uso 
        // se encontar um email e o id deste email for diferente do id do usuário, retorna uma mensagem
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){ 
            throw new AppError("Este email já está em uso")
        }

        user.nome = nome
        user.email = email


        // Fazer o update na tabela

        await database.run("update users set name = (?), email = (?), updated_at = (?) where id = (?)", [user.nome, user.email, new Date(), id])

        return response.status(200).json()
    }
}

module.exports = UsersController
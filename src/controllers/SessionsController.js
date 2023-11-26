
const knex = require('../database/knex')

const AppError = require('../utils/AppError')

class SessionsController {


    // Criar uma sessão
    async create(request, response){

        const { email, password } = request.body

        const user = await knex("users").where({ email }).first()

        if(!user){
            throw new AppError("E-mail e/ou senha incorreto", 401)
        }

        return response.json({  user })
    }

}

module.exports = SessionsController
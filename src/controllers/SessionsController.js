
const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const { compare } = require('bcryptjs')

const authConfig = require('../configs/auth') // importar a configuração
const { sign } = require("jsonwebtoken") // importar do jsonWebToken

class SessionsController {


    // Criar uma sessão
    async create(request, response){

        const { email, password } = request.body

        const user = await knex("users").where({ email }).first()

        if(!user){
            throw new AppError("E-mail e/ou senha incorreto", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreto", 401)
        }

        // depois da verificação, gerar token JWT ( json web token )
        // Desestruturar o secret e expiresIn de authConfig
        const {secret, expiresIn } = authConfig.jwt
        
        // Gerar o token
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
        })

        return response.json({  user, token })
    }

}

module.exports = SessionsController
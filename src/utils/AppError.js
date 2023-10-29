// Para padronizar o tipo de mensagem que vai aparecer

class AppError {
    message
    statusCode

    constructor(message, statusCode = 400){
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError
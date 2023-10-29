const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

const path = require('path')


// criar uma função async para lidar com banco
// se o arquivo nao existir, ele vai criar o arquivo 
async function sqliteConnection(){

    // Abrir uma conexão /// passando um objeto com configurações da conexão
    const database = await sqlite.open({
        // vamos usar a biblioteca path para resolver navegação de diretórios independento do sistema que estive rodando a aplicação
        filename: path.resolve( __dirname, "..", "database.db"),
        driver: sqlite3.Database
    })

    return database
}


// vai usar no server
module.exports = sqliteConnection
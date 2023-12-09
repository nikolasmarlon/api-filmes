
// para lidar com manipulação de arquivos do node
const fs = require("fs")

// Para lidar com os diretórios 
const path = require("path")

// Configurações
const uploadConfig = require("../configs/upload")


// Criar como class
class DiskStorage{

    async savaFile(file){

        // reneme é usado renomear ou mudar o arquivo de lugar
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER)
        )
        return file
    }

    async deleteFile(file){

        // pegar o endereço do arquivo
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {

            // stat retorna o estodo do arquivo ( se está aberto... ou disponível)
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        // unlink remove o arquivo 
        await fs.promises.unlink(filePath)
    }
}

module.exports = DiskStorage
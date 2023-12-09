const path  = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") // endereço
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") // endereço

// Multer é a biblioteca para fazer o upload
const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            //evitar arquivos com nomes iguais
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}


module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}
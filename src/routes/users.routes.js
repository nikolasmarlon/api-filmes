const { Router } = require('express')

const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController') // classe precisa ser instânciada
const UserAvatarController = require('../controllers/UserAvatarController') // classe precisa ser instânciada


//Inicializando Router()
const usersRoutes = Router()

// Inicializando multer
// multer com as configuraçções do upload config
const upload = multer(uploadConfig.MULTER)

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')



const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

// A rota vai receber a requisição e a resposta e repassar para o controller
usersRoutes.post("/", usersController.create) // a rota tem o endereço, o middleware e o controller, ( antes do executar o controller, tudo vai passar pelo middleware)
usersRoutes.put('/', ensureAuthenticated, usersController.update) // Aplicando Middleware
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update) // Atualizar um campo específico

/* usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), (request, response)=> {
    console.log(request.file.filename)
    response.json()
}) // Atualizar um campo específico
*/

module.exports = usersRoutes
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController{


    async update(request, response){

        
        const user_id = request.user.id // buscar id do usuário
        const avatarFilename = request.file.filename // pegar o nome do arquivo do upload
        
        // instânciar diskstorage
        const diskStorage = new DiskStorage()
       
        // buscar com knex no banco os dados do usuário para atualizar e por numa constante
        const user = await knex("users").where({ id: user_id}).first() 

        // Verificar se está autenticado
        if(!user){
            throw new AppError("Somente usuário autenticados podem alterar a foto de perfil", 401)
        }

        // Verificar se existe avatar e deletar a antiga
        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }


        // Pegar a nova foto ( avatar )
        const filename = await diskStorage.saveFile(avatarFilename)

        user.avatar = filename

        //salvar 
        await knex("users").update(user).where({id: user_id})

        return response.json(user)
    }
}

module.exports = UserAvatarController
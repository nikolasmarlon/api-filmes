const knex = require('../database/knex')


class MovieTagsController{

    // Listar todas as tags
    async index(request, response){
        const  user_id = request.user.id

        const movieTags = await knex("movie_tags")
        .where({ user_id })


        return response.json(movieTags)


    }

}

module.exports = MovieTagsController
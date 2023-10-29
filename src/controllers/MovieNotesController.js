const knex = require('../database/knex') // knex de dentro de database do projeto

class MovieNotesController {

    async create(request, response){
        const { title, description, rating, movie_tags } = request.body
        const { user_id } = request.params



        // estamos usando o knex para inserir no banco
        // e recuperando na variável o id da nota que acabou de inserir 
        // para poder cadastrar as tags depois 
        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        // vai pegar movie_tags e para cada uma, retornar um vetor de objetos que vamos inserir com knex.insert
        const movieTagsInsert =  movie_tags.map( name => {
            return{
                note_id,
                name,
                user_id
            }
            
        })
        
        
        await knex("movie_tags").insert(movieTagsInsert) // inserindo o vetor com kenx no banco

        response.json()
    }

    

}


module.exports = MovieNotesController
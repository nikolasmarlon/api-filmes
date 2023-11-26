const knex = require('../database/knex') // knex de dentro de database do projeto

class MovieNotesController {

    // Criar uma nota
    async create(request, response){
        const { title, description, rating, movie_tags } = request.body
        const  user_id  = request.user.id



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

        return response.json()
    }


    // Listar uma notas
    async show(request, response){
        // recuperar o id de request params
        const { id } = request.params

        // selecionar a nota, buscando pelas notas baseadas no id, e pegar a primeira nota
        const note = await knex('movie_notes').where({id}).first()

        // selecionar as movie_tags
        const tags = await knex('movie_tags').where({note_id: id}).orderBy("name")


        return response.json({
            ...note,
            tags
        })
    }


    // Deletar uma nota
    async delete(request, response){
        const { id } = request.params

        await knex("movie_notes").where({ id }).delete()


        return response.json()
    }

    // Listar todas as notas
    async index(request, response){

        
        const { title, movie_tags} = request.query

        const  user_id  = request.user.id

        let notes


        // se tiver tags , vai consulter por elas, caso nao tenha, segue para consultar por title ou id
        if(movie_tags){

            // pegar as tags e separar por virgula, pois foi enviado na query separado por virgulas
            const filterMovieTags = movie_tags.split(',').map(tag => tag.trim())
            // console.log(filterMovieTags)

            notes = await knex('movie_tags')
                .select([
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.user_id",
                ])
                .where("movie_notes.user_id", user_id)
                .whereLike("movie_notes.title", `%${title}%` )
                .whereIn("name", filterMovieTags) // busca somente a tag e nao as notas vinculadas
                .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
                .orderBy("movie_notes.title")

        } else {
            
            // Buscar todas as notas deste usuário 
            notes = await knex("movie_notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title")
        }

        const userMovieTags = await knex("movie_tags").where({ user_id })

        // notas com as tags
        const movieNotesWithTags = notes.map(note => {
            const noteTags = userMovieTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                movie_tags: noteTags
            }
        })

        return response.json({
            movieNotesWithTags
        })
    }

}


module.exports = MovieNotesController
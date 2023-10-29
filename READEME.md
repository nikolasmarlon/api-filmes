exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id")
    table.text("name")
    table.text("email")
    table.text("password")
    table.text("avatar").nullable()
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("users")




exports.up = knex => knex.schema.createTable("movie_notes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("rating")
    table.integer("user_id").references("id").inTable("users")
  
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  });
  
  exports.down = knex => knex.schema.dropTable("movie_notes");
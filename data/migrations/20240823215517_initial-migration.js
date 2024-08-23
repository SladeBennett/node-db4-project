exports.up = async function (knex) {
    await knex.schema
        .createTable('recipes', tbl => {
            tbl.increments('recipe_id')
            tbl.string('recipe_name', 200).notNullable().unique()
        })
        .createTable('ingredients', tbl => {
            tbl.increments('ingredient_id')
            tbl.string('ingredient_name', 200).notNullable().unique()
            tbl.string('ingredient_unit', 50)
        })
        .createTable('steps', tbl => {
            tbl.increments('step_id')
            tbl.string('step_text', 200).notNullable()
            tbl.integer('step_number').notNullable()
            tbl.integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('recipe_id')
                .inTable('recipes')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })
        .createTable('steps_ingredients', table => {
            table.increments('steps_ingredients-id')
        })

}

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('steps_ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
}




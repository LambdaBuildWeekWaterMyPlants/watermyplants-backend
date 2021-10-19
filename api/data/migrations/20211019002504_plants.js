exports.up = async (knex) => {
    await knex.schema
      .createTable('plants', (plants) => {
        plants.increments('plant_id')
        plants.string('nickname', 200).notNullable()
        plants.string('species', 200).notNullable()
        plants.string('h2o_frequency', 200).notNullable()
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('plants')
  }

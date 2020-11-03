exports.up = function (knex) {
    return knex.schema.createTable('slang', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('example').notNullable();
        table.string('explanation').notNullable();
        table.string('state').notNullable();
        table.string('category').notNullable();
        table.string('likes').notNullable();
        table.string('id_user').notNullable();
        table.timestamp('data_sync', { useTz: true }, { precision: 6 }).defaultTo(knex.fn.now(6));
        table.foreign('id_user').references('id').inTable('users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('slang');
};

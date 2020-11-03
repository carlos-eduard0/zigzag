
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('estado').notNullable();
        table.string('senha').notNullable();
        table.timestamp('data_sync', { useTz: true }, { precision: 6 }).defaultTo(knex.fn.now(6));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};


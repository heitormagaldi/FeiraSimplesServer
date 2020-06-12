import Knex from 'knex';

export async function up(knex: Knex) {
  // criar a tabela
  return knex.schema.createTable('CLIENTE', table => {
    table.increments('ID').primary();
    table.string('NOME', 100).notNullable();
    table.string('EMAIL', 100).notNullable();
    table.string('FOTO', 50);
    table.string('TELEFONE', 15);
    table.string('TELEFONE2', 15);
    table.string('SENHA', 32);
    table.string('ATIVACAO', 100);
    table.boolean('ATIVO');
    table.string('CPF', 14);
//  table.decimal('LATITUDE');
//  table.decimal('LONGITUDE');

  })
  /*
  CHAVES ESTANGEIRAS
      table.integer('FK_PRODUTOS')
      .notNullable()
      .references('ID')
      .inTable('PRODUTOS');
  */
}

export async function down(knex: Knex) {
  return knex.schema.dropSchema('CLIENTE');
  //voltar atras / remover
}
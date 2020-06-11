
import Knex from 'knex';

export async function seeds(knex: Knex){
  await knex('Categoria').insert([
      {nome: 'Frutas'},
      {nome: 'Legumes'},
      {nome: 'Verduras'},
      {nome: 'Orgânicos'},
      {nome: 'Tempeiros'},
  ])

}
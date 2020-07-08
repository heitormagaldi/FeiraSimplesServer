import { Request, Response } from 'express';
import knex from '../database/connection';

class CategoriasController {
  async index(request: Request, response: Response) {

    //select * from produtos
    const categorias = await knex('CATEGORIA')
      .distinct()
      .join('PRODUTO', 'PRODUTO.CATEGORIA', '=', 'CATEGORIA.ID')
      .select('CATEGORIA.*');
    console.log(categorias);
    return response.json(categorias);
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (id != "0") {
      const produto = await knex('PRODUTO')
        .join('CATEGORIA', 'PRODUTO.CATEGORIA', '=', 'CATEGORIA.ID')
        .join('UNIDADE', 'PRODUTO.IDUNIDADE', '=', 'UNIDADE.ID')
        .select('PRODUTO.*',
          'UNIDADE.DESCRICAO AS UNIDADE_NOME',
          'CATEGORIA.NOME AS CATEGORIA_NOME')
        .where('CATEGORIA.ID', id);
    }else{
      const produto = await knex('PRODUTO')
      .join('CATEGORIA', 'PRODUTO.CATEGORIA', '=', 'CATEGORIA.ID')
      .join('UNIDADE', 'PRODUTO.IDUNIDADE', '=', 'UNIDADE.ID')
      .select('PRODUTO.*',
        'UNIDADE.DESCRICAO AS UNIDADE_NOME',
        'CATEGORIA.NOME AS CATEGORIA_NOME')
      .where('PRODUTO.DESTAQUE', 1);
    }

    return response.json(produto);
  }
}
export default CategoriasController;
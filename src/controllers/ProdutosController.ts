import { Request, Response } from 'express';
import knex from '../database/connection';

class ProdutosController{

async show(request:Request, response:Response){
  const {id} = request.params;


  const produto = await knex('PRODUTO').where('ID',id).first();

  if (!produto) {
    return response.status(400).json({message:'Produto não encontrado'});
  }
  return response.json(produto);
}

  async index (request:Request, response:Response) {

    //select * from produtos
    const produtos = await knex('PRODUTO').select('*');
    const serializacao = produtos.map(produtos => {
      const produtosaux = { ...produtos, IMAGEM: `http://localhost:3333/uploads/${produtos.IMAGEM}` };
      return produtosaux;
    });
    return response.json(serializacao);
  }

}

export default ProdutosController;
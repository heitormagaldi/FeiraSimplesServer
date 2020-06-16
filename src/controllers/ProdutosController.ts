import { Request, Response } from 'express';
import knex from '../database/connection';

class ProdutosController {

  async query(request: Request, response: Response) {
    const { categoria, destaque} = request.query;
    
    const produtos= await knex('PRODUTO')
    .where('CATEGORIA', String(categoria))
    .where('DESTAQUE', Number(destaque))
    .distinct();

    
    response.json(produtos);

    
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;


    const produto = await knex('PRODUTO').where('ID', id).first();

    if (!produto) {
      return response.status(400).json({ message: 'Produto não encontrado' });
    }
    return response.json(produto);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;


    const produto = await knex('PRODUTO').where('ID', id).delete();

    if (!produto) {
      return response.status(400).json({ message: 'Produto não encontrado' });
    }
    return response.json( {message: '100'});
  }


  async index(request: Request, response: Response) {

    //select * from produtos
    const produtos = await knex('PRODUTO').select('*');
    const serializacao = produtos.map(produtos => {
      const produtosaux = { ...produtos, IMAGEM: `http://localhost:3333/uploads/${produtos.IMAGEM}` };
      return produtosaux;
    });
    return response.json(serializacao);
  }

  async create(request: Request, response: Response) {
    const {
      fornecedor,
      categoria,
      nome,
      idunidade,
      imagem,
      descricao,
      quantidade,
      preco,
      promocao,
      destaque,
    } = request.body;

    //transaction, ideal quando há dependendias entre os inserts
    //const trx = await knex.transaction();

    //idsInseridos recebera todos os ids adicionados 
    //idsInseridos[0] , nesse caso como so tem 1, será o nosso cliente
    //deixei so para lembrar
    const produto = {
      fornecedor,
      categoria,
      nome,
      idunidade,
      imagem:'',
      descricao,
      quantidade,
      preco,
      promocao,
      destaque,
    }
    //SO PARA NAO ESQUECER
    //const idsInseridos = await trx('CLIENTE').insert(cliente);
    const idsInseridos = await knex('PRODUTO').insert(produto);
    
    const produto_id = idsInseridos[0]; 

    return response.json({ 
      id: produto_id,
      ...produto,
     });
         
  }

}

export default ProdutosController;
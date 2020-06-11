import { Request, Response } from 'express';
import knex from '../database/connection';

class ClientesController {

  async create(request: Request, response: Response) {
    const {
      nome,
      email,
      telefone,
      telefone2,
      senha,
      cpf,
      latitude,
      longitude,
    } = request.body;

    //transaction, ideal quando há dependendias entre os inserts
    //const trx = await knex.transaction();

    //idsInseridos recebera todos os ids adicionados 
    //idsInseridos[0] , nesse caso como so tem 1, será o nosso cliente
    //deixei so para lembrar
    const cliente = {
      nome,
      email,
      telefone,
      telefone2,
      senha,
      cpf,
      foto: '',
      latitude,
      longitude
    }
    //SO PARA NAO ESQUECER
    //const idsInseridos = await trx('CLIENTE').insert(cliente);
    const idsInseridos = await knex('CLIENTE').insert(cliente);
    
    const cliente_id = idsInseridos[0]; 

    return response.json({ 
      id: cliente_id,
      ...cliente,
     });
    
     console.log(cliente);
  }

  async show(request: Request, response: Response) {
  
    const {id} = request.params;
    const cliente = await knex('CLIENTE').where('ID',id).first();
    const pedidos = await knex('PEDIDO').where('IDCLIENTE', id) ;
    // tempo: 1:48
    return response.json({cliente, pedidos });
  
  }

}

export default ClientesController;
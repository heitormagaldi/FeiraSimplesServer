import { Request, Response } from 'express';
import knex from '../database/connection';
import moment from 'moment';


class PedidosController {
  async show(request: Request, response: Response) {
    const { id } = request.params;
    
    
    let pedido = await knex('PEDIDO')
    .join('ENDERECO','PEDIDO.IDENDERECO','=','ENDERECO.ID')
    .join('TRANSPORTADOR','PEDIDO.IDTRANSPORTADOR','=','TRANSPORTADOR.ID')
    .where('PEDIDO.ID', id)
    .first();


    const dataAux = moment(pedido.DATA).format("DD/MM/YYYY");
        
    pedido = {
      ...pedido,
      DATA:dataAux,
    }

    




    if (!pedido) {
      return response.status(400).json({ message: 'Pedido não encontrado' });
    }
    const itensTmp = await knex('PEDIDO_ITENS')
    .join('PRODUTO','PEDIDO_ITENS.IDPRODUTO','=','PRODUTO.ID')
    .join('CATEGORIA','PRODUTO.CATEGORIA','=','CATEGORIA.ID')
    .where('PEDIDO_ITENS.IDPEDIDO', id)
    .select('PEDIDO_ITENS.QTD',
    'PEDIDO_ITENS.VALOR',
    'PEDIDO_ITENS.QTD',
    'PRODUTO.NOME',
    'CATEGORIA.NOME',
    'PRODUTO.IMAGEM');
    
    

    const itens = itensTmp.map(item => {
      const itemAux = { ...item, IMAGEM: `http://localhost:3333/uploads/${item.IMAGEM}` };
      return itemAux;
    });

    return response.json({ pedido, itens });
  }

  async create(request: Request, response: Response) {
    const {
      idCliente,
      idEndereco,
      idTransportador,
      valor,
      status,
      itens
    } = request.body;

    //verificar por que o trx não funhciona.
    const trx = await knex.transaction();

    const pedido = {
      idCliente,
      idEndereco,
      idTransportador,
      valor,
      status,
    }
    const moment = require('moment');
    const pedidoAux = {
      ...pedido,
      data: moment().format('YYYY-MM-DD hh:mm:ss')
    }
    
    const idsInseridos = await knex('PEDIDO').insert(pedidoAux);
    const pedido_id = idsInseridos[0];
    const itensPedido = itens.map((item: object) => {

      return {
        IDPEDIDO: pedido_id,
        ...item,
      }

    });
    
    console.log(itensPedido);

    await knex('PEDIDO_ITENS').insert(itensPedido);

    return response.json({
      id: pedido_id,
      ...pedido
    });

    

  }
}
export default PedidosController;
import express, { request, response } from 'express';

import ClientesController from './controllers/ClientesController';
import ProdutosController from './controllers/ProdutosController';
import PedidosController from './controllers/PedidosController';


const routes = express.Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();
const pedidosController = new PedidosController();
//index listagem
//show um unico registro
//create, update, delete

routes.get('/produtos',produtosController.index);
routes.get('/produtos/:id',produtosController.show);

routes.post('/clientes', clientesController.create);
routes.get('/clientes/:id', clientesController.show);
//routes.put('/clientes/:id', clientesController.update);


routes.get('/pedidos/:id', pedidosController.show);
routes.post('/pedidos', pedidosController.create);



export default routes;
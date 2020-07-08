import express, { request, response } from 'express';

import ClientesController from './controllers/ClientesController';
import ProdutosController from './controllers/ProdutosController';
import PedidosController from './controllers/PedidosController';
import CategoriasController from './controllers/CategoriasController';

const routes = express.Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();
const pedidosController = new PedidosController();
const categoriasController = new CategoriasController();

//index listagem
//show um unico registro
//create, update, delete


routes.put('/produtos',produtosController.query);
routes.get('/produtos',produtosController.index);
routes.get('/produtos/:id',produtosController.show);
routes.post('/produtos/',produtosController.create);
routes.delete('/produtos/:id',produtosController.delete);

routes.post('/clientes', clientesController.create);
routes.get('/clientes/:id', clientesController.show);
//routes.put('/clientes/:id', clientesController.update);


routes.get('/pedidos/:id', pedidosController.show);
routes.post('/pedidos', pedidosController.create);

routes.get('/categorias',categoriasController.index);
routes.get('/categorias/:id',categoriasController.show);

export default routes;
import express, { request, response } from 'express';

import ClientesController from './controllers/ClientesController';
import ProdutosController from './controllers/ProdutosController';

const routes = express.Router();

const clientesController = new ClientesController();
const produtosController = new ProdutosController();

//index listagem
//show um unico registro
//create, update, delete

routes.get('/produtos',produtosController.index);
routes.get('/produtos/:id',produtosController.show);

routes.post('/clientes', clientesController.create);
routes.get('/clientes/:id', clientesController.show);


export default routes;
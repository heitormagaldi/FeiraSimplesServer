import express from 'express';

const app = express();
app.get('/users', (request, response)=>{
  console.log('listagem de usuários');

  response.json(['Heitor',
'Testes',
 'usuários',
'Teste tsnode']);

});

app.listen(3333);
import path from 'path';

module.exports = {
  client: 'mysql',
  connection: {
    filename: path.resolve(__dirname,'src','database', 'database.mysql'),
    host : '192.185.212.179',
    user : 'feiras62_dev',
    password : '}#G{$l;U4lay',
    database : 'feiras62_dev'
  },
  migrations:{
    directory: path.resolve(__dirname,'src','database', 'migrations'),
  },
  seeds:{
    directory: path.resolve(__dirname,'src','database', 'seeds'),
  },
  useNullAsDefault: true,

  //COMANDO PARA EXECUTAR A MIGRATION
  // npx knex migrate:latest --knexfile {CAMINHO DO ARQUVO .. COMO ESTA NA RAIZ, SO ELE MESMO}
  // npx knex migrate:latest --knexfile knexfile.ts migrate:latest
  
  //CRIEI NO PACKAGE A ROTA knex:migrate
  //npm knex:migrate


};
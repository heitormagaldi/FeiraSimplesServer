import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'mysql',
  connection: {
    filename: path.resolve(__dirname, 'database.mysql'),
    host : '192.185.212.179',
    user : 'feiras62_dev',
    password : '}#G{$l;U4lay',
    database : 'feiras62_dev'
  },
  useNullAsDefault: true,
});
export default connection;



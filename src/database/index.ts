import { Client } from 'pg';
import initDatabase from './init';

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

initDatabase(client);

client.connect((err): void => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connect DB successfully');
});

export default client;

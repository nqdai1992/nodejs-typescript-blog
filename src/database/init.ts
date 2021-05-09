import { Client } from 'pg';
import TableNames from './enum/TableNames';

export default function initDatabase(client: Client): void {
  client.query(`
    CREATE TABLE IF NOT EXISTS ${TableNames.ARTICLE} (
        id int,
        authorId int,
        title text,
        type text,
        description text,
        content text
    );
    ALTER TABLE ${TableNames.ARTICLE} ADD PRIMARY KEY (id);
  `);
}

import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import { from as copyFrom } from 'pg-copy-streams';
import TableNames from './enum/TableNames';

export default function initDatabase(client: Client): void {
  client.query(`
    DROP TABLE IF EXISTS ${TableNames.ARTICLE};
    CREATE TABLE ${TableNames.ARTICLE} (
        id int primary key,
        authorId int,
        title text,
        type text,
        description text,
        content text
    );
  `);
  const stream = client.query(copyFrom(`COPY ${TableNames.ARTICLE} FROM STDIN DELIMITER ',' CSV`));
  const fileStream = fs.createReadStream(path.join(__dirname, './mockData/article.csv'));
  fileStream.pipe(stream);
}

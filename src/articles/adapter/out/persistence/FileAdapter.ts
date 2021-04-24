import { ArticlePort } from '../../../application/ports/out/ArticlePort';
import fsPromise from 'fs/promises';
import path from 'path';
import IArticle from '../../../domain/IArticle';
import IArticleWithoutId from '../../../domain/IArticleWithoutId';

const dataPath = path.join(__dirname, '../../../../../data');

const FileAdapter = (): ArticlePort => ({
  create: async (payload: IArticle) => {
    const filePath = `${dataPath}/${payload.id}.json`;

    await fsPromise.writeFile(filePath, JSON.stringify(payload));

    return payload;
  },
  update: async (id: string, payload: IArticleWithoutId) => {
    const filePath = `${dataPath}/${id}.json`;

    await fsPromise.writeFile(
      filePath,
      JSON.stringify({
        id,
        ...payload,
      }),
    );

    return {
      id,
      ...payload,
    };
  },
  findOne: async (id: string) => {
    const filePath = `${dataPath}/${id}.json`;

    const content = await fsPromise.readFile(filePath);

    return JSON.parse(content.toString());
  },
  findAll: async () => {
    const fileNames = await fsPromise.readdir(dataPath);
    return (await Promise.all(
      fileNames.map(async (fileName) =>
        (await fsPromise.readFile(`${dataPath}/${fileName}`)).toString(),
      ),
    )).map(content => JSON.parse(content));
  },
  delete: async (id: string) => {
    const filePath = `${dataPath}/${id}.json`;

    await fsPromise.unlink(filePath);

    return true
  },
});

export default FileAdapter;

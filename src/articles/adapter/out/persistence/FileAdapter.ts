import ArticleOutPort from '../../../application/ports/out/ArticleOutPort';
import fsPromise from 'fs/promises';
import fs from 'fs'
import path from 'path';
import Article from '@src/articles/domain/Article';

const dataPath = path.join(require.main.path, '../data');

class FileAdapter implements ArticleOutPort {
  constructor (dirpath: string) {
    try {
      fs.mkdirSync(dirpath)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  }

  async create (payload) {
    const id = Date.now().toString()
    const filePath = `${dataPath}/${id}.json`;
    const newArticle = Article.withId(id, payload.authorId, payload.content)

    await fsPromise.writeFile(filePath, JSON.stringify({
      id: newArticle.id,
      authorId: newArticle.authorId,
      content: newArticle.content
    }));

    return newArticle
  }

  async update (payload) {
    const filePath = `${dataPath}/${payload.id}.json`;

    await fsPromise.writeFile(
      filePath,
      JSON.stringify({
        id: payload.id,
        content: payload.content,
        authorId: payload.authorId
      }),
    );

    return payload;
  }
  async findOne (id: string) {
    const filePath = `${dataPath}/${id}.json`;

    const content = await fsPromise.readFile(filePath);

    return JSON.parse(content.toString());
  }
  
  async findAll () {
    const fileNames = await fsPromise.readdir(dataPath);
    return (await Promise.all(
      fileNames.map(async (fileName) =>
        (await fsPromise.readFile(`${dataPath}/${fileName}`)).toString(),
      ),
    )).map(content => JSON.parse(content));
  }

  async delete (id: string) {
    console.log('remove file',id)
    const filePath = `${dataPath}/${id}.json`;

    await fsPromise.unlink(filePath);

    return true
  }
};

export default new FileAdapter(dataPath)

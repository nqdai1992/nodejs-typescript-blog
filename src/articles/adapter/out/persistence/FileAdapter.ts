import ArticleOutPort from '../../../application/ports/out/ArticleOutPort';
import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import Article from '@src/articles/domain/Article';
import CreatingArticlePayload from '@src/articles/application/ports/in/CreatingArticlePayload';
import UpdatingArticlePayload from '@src/articles/application/ports/in/UpdatingArticlePayload';

const dataPath = path.join(require.main.path, '../data');

class FileAdapter implements ArticleOutPort {
  constructor(dirpath: string) {
    try {
      fs.mkdirSync(dirpath);
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  }

  async create(payload: CreatingArticlePayload) {
    const id = Date.now().toString();
    const filePath = `${dataPath}/${id}.json`;
    const newArticle = Article.withId(
      id,
      payload.authorId,
      payload.content,
      payload.description,
      payload.title,
      payload.type
    );
    try {
      await fsPromise.writeFile(
        filePath,
        JSON.stringify({
          id: newArticle.id,
          authorId: newArticle.authorId,
          content: newArticle.content,
          description: newArticle.description,
          title: newArticle.title,
          type: newArticle.type
        }),
      );

      return newArticle;
    } catch (err) {
      return null;
    }
  }

  async update(payload: UpdatingArticlePayload) {
    const filePath = `${dataPath}/${payload.id}.json`;

    await fsPromise.writeFile(
      filePath,
      JSON.stringify({
        id: payload.id,
        content: payload.content,
        authorId: payload.authorId,
        description: payload.description,
        title: payload.title,
        type: payload.type
      }),
    );

    return payload;
  }
  async findOne(id: string) {
    const filePath = `${dataPath}/${id}.json`;

    try {
      const content = await fsPromise.readFile(filePath);
      return JSON.parse(content.toString());
    } catch (err) {
      return null;
    }
  }

  async findAll() {
    const fileNames = await fsPromise.readdir(dataPath);
    return (
      await Promise.all(
        fileNames.map(async (fileName) =>
          (await fsPromise.readFile(`${dataPath}/${fileName}`)).toString(),
        ),
      )
    ).map((content) => JSON.parse(content));
  }

  async delete(id: string) {
    const filePath = `${dataPath}/${id}.json`;

    await fsPromise.unlink(filePath);

    return true;
  }
}

export default new FileAdapter(dataPath);

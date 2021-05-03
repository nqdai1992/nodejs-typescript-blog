import FileAdapter from '../../adapter/out/persistence/FileAdapter';
import ArticleOutPort from '../ports/out/ArticleOutPort';
import ArticleInPort from '../ports/in/ArticleInPort';
import UpdatingArticlePayload from '../ports/in/UpdatingArticlePayload';
import RemovingArticlePayload from '../ports/in/RemovingArticlePayload';
import CreatingArticlePayload from '../ports/in/CreatingArticlePayload';
import GettingOneArticlePayload from '../ports/in/GettingOneArticlePayload';
import Article from '@src/articles/domain/Article';
import APIError from '@src/common/APIError';
import HttpStatusCode from '@src/common/HttpStatusCode';

export default class ArticleService implements ArticleInPort {
  private ArticleAdapter: ArticleOutPort;

  constructor() {
    this.ArticleAdapter = FileAdapter;
  }

  async createArticle(payload: CreatingArticlePayload): Promise<Article> {
    const { authorId, content } = payload;
    const articleWithoutId = Article.withoutId(authorId, content);
    const article = await this.ArticleAdapter.create(articleWithoutId);

    if (!article)
      throw new APIError(
        'UNABLE TO CREATE',
        HttpStatusCode.INTERNAL_SERVER,
        true,
        'Unable create the article',
      );

    return article;
  }

  async getArticle(payload: GettingOneArticlePayload): Promise<Article | null> {
    const { id } = payload;
    const article = await this.ArticleAdapter.findOne(id);

    if (!article)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCode.NOT_FOUND,
        true,
        'Article is not found',
      );

    return article;
  }

  async getAllArticle(): Promise<Article[]> {
    return await this.ArticleAdapter.findAll();
  }

  async updateArticle(
    payload: UpdatingArticlePayload,
  ): Promise<Article | null> {
    const { id, authorId, content } = payload;
    const article = Article.withId(id, authorId, content);
    const newArticle = await this.ArticleAdapter.update(article);

    if (!newArticle)
      throw new APIError(
        'UNABLE TO UPDATE',
        HttpStatusCode.INTERNAL_SERVER,
        true,
        'Unable update the article',
      );

    return newArticle;
  }

  async removeArticle(payload: RemovingArticlePayload): Promise<boolean> {
    const { id } = payload;
    const isRemovedSuccessfully = await this.ArticleAdapter.delete(id);

    if (!isRemovedSuccessfully)
      throw new APIError(
        'UNABLE TO REMOVE',
        HttpStatusCode.INTERNAL_SERVER,
        true,
        'Unable remove the article',
      );

    return isRemovedSuccessfully;
  }
}

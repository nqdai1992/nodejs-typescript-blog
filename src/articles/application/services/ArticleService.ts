import FileAdapter from '../../adapter/out/persistence/FileAdapter';
import IArticle from '../../domain/IArticle';
import IArticleWithoutId from '../../domain/IArticleWithoutId';
import { ArticlePort } from '../ports/out/ArticlePort';
import IArticleService from '../ports/in/IArticleService'

export default class ArticleService implements IArticleService {
  private ArticleAdapter: ArticlePort;

  constructor() {
    this.ArticleAdapter = FileAdapter();
  }

  async createArticle(payload: IArticleWithoutId): Promise<IArticle> {
    return await this.ArticleAdapter.create(payload);
  }

  async getArticle(id: string): Promise<IArticle> {
    return await this.ArticleAdapter.findOne(id);
  }

  async getAllArticle(): Promise<IArticle[]> {
    return await this.ArticleAdapter.findAll();
  }

  async updateArticle(
    id: string,
    payload: IArticleWithoutId,
  ): Promise<IArticle> {
    return await this.ArticleAdapter.update(id, payload);
  }

  async removeArticle(id: string): Promise<boolean> {
    return await this.ArticleAdapter.delete(id);
  }
}

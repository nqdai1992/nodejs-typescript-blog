import FileAdapter from '../../adapter/out/persistence/FileAdapter';
import ArticleOutPort from '../ports/out/ArticleOutPort';
import ArticleInPort from '../ports/in/ArticleInPort';
import UpdatingArticlePayload from '../ports/in/UpdatingArticlePayload';
import RemovingArticlePayload from '../ports/in/RemovingArticlePayload';
import CreatingArticlePayload from '../ports/in/CreatingArticlePayload';
import GettingOneArticlePayload from '../ports/in/GettingOneArticlePayload';
import Article from '@src/articles/domain/Article';

export default class ArticleService implements ArticleInPort {
  private ArticleAdapter: ArticleOutPort;

  constructor() {
    this.ArticleAdapter = FileAdapter;
  }

  async createArticle(payload: CreatingArticlePayload): Promise<Article> {
    const { authorId, content } = payload;
    const articleWithoutId = Article.withoutId(authorId, content);

    return await this.ArticleAdapter.create(articleWithoutId);
  }

  async getArticle(payload: GettingOneArticlePayload): Promise<Article> {
    const { id } = payload;
    return await this.ArticleAdapter.findOne(id);
  }

  async getAllArticle(): Promise<Article[]> {
    return await this.ArticleAdapter.findAll();
  }

  async updateArticle(payload: UpdatingArticlePayload): Promise<Article> {
    const { id, authorId, content } = payload;
    const article = Article.withId(id, authorId, content);
    return await this.ArticleAdapter.update(article);
  }

  async removeArticle(payload: RemovingArticlePayload): Promise<boolean> {
    const { id } = payload;
    return await this.ArticleAdapter.delete(id);
  }
}

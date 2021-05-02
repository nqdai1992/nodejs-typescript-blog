import IArticle from '@src/articles/domain/IArticle';
import IArticleWithoutId from '@src/articles/domain/IArticleWithoutId';

export default interface IArticleService {
  createArticle(payload: IArticleWithoutId): Promise<IArticle>;
  getArticle(id: string): Promise<IArticle>;
  getAllArticle(): Promise<IArticle[]>;
  updateArticle(id: string, payload: IArticleWithoutId): Promise<IArticle>;
  removeArticle(id: string): Promise<boolean>;
}

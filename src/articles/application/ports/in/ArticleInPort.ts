import Article from '@src/articles/domain/Article';
import CreatingArticlePayload from './CreatingArticlePayload';
import GettingOneArticlePayload from './GettingOneArticlePayload';
import RemovingArticlePayload from './RemovingArticlePayload';
import UpdatingArticlePayload from './UpdatingArticlePayload';

export default interface ArticleInPort {
  createArticle(payload: CreatingArticlePayload): Promise<Article>;
  getArticle(payload: GettingOneArticlePayload): Promise<Article>;
  getAllArticle(): Promise<Article[]>;
  updateArticle(payload: UpdatingArticlePayload): Promise<Article>;
  removeArticle(payload: RemovingArticlePayload): Promise<boolean>;
}

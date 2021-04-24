import FileAdapter from '../../adapter/out/persistence/FileAdapter';
import IArticle from '../../domain/IArticle';
import IArticleWithoutId from '../../domain/IArticleWithoutId';
import { ArticlePort } from '../ports/out/ArticlePort';

const ArticleAdapter: ArticlePort = FileAdapter();

export const createArticle = async (payload: IArticleWithoutId): Promise<IArticle> => {
  return await ArticleAdapter.create(payload);
};

export const getArticle = async (id: string): Promise<IArticle> => {
  return await ArticleAdapter.findOne(id);
};

export const getAllArticle = async (): Promise<IArticle[]> => {
  return await ArticleAdapter.findAll();
};

export const updateArticle = async (
  id: string,
  payload: IArticleWithoutId,
): Promise<IArticle> => {
  return await ArticleAdapter.update(id, payload);
};

export const removeArticle = async (id: string): Promise<boolean> => {
  return await ArticleAdapter.delete(id);
};

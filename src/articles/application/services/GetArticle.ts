import FileAdapter from '../../adapter/FileAdapter';
import IArticle from '../../domain/IArticle';
import { ArticlePort } from '../ports/out/ArticlePort';

const ArticleAdapter: ArticlePort = FileAdapter();

export const getArticle = async (id: string): Promise<IArticle> => {
    return await ArticleAdapter.findOne(id);
};

export const getAllArticle = async (): Promise<IArticle[]> => {
    return await ArticleAdapter.findAll();
};

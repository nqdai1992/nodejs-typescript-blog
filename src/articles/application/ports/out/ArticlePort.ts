import IArticle from "../../../domain/IArticle";
import IArticleWithoutId from "../../../domain/IArticleWithoutId";

export interface ArticlePort {
    create: (payload: IArticleWithoutId) => Promise<IArticle>;
    findOne: (id: string) => Promise<IArticle>;
    findAll: () => Promise<IArticle[]>;
    update: (id: string, payload: IArticleWithoutId) => Promise<IArticle>;
    delete: (id: string) => Promise<boolean>;
}
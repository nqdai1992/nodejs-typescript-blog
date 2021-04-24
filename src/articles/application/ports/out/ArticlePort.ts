import IArticle from "../../../domain/IArticle";

export interface ArticlePort {
    create: (payload: Omit<IArticle, 'id'>) => Promise<IArticle>;
    findOne: (id: string) => Promise<IArticle>;
    findAll: () => Promise<IArticle[]>;
    update: (id: string, payload: Omit<IArticle, 'id'>) => Promise<IArticle>;
    delete: (id: string) => Promise<boolean>;
}
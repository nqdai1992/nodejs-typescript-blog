import Article from "@src/articles/domain/Article";

export default interface ArticleOutPort {
    create: (payload: Article) => Promise<Article>;
    findOne: (id: string) => Promise<Article>;
    findAll: () => Promise<Article[]>;
    update: (payload: Article) => Promise<Article>;
    delete: (id: string) => Promise<boolean>;
}
import Article from "@src/articles/domain/Article";

export default interface ArticleOutPort {
    create: (payload: Article) => Promise<Article | null>;
    findOne: (id: string) => Promise<Article | null>;
    findAll: () => Promise<Article[]>;
    update: (payload: Article) => Promise<Article | null>;
    delete: (id: string) => Promise<boolean>;
}
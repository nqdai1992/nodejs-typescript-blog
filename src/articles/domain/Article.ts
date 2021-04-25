import IArticle from './IArticle';

const Article = (id: string, authorId: string, content: string) => ({ id, authorId, content });

const withoutId = (authorId: string, content: string): IArticle =>
  Article(null, authorId, content);

const withId = (id: string, authorId: string, content: string): IArticle =>
  Article(id, authorId, content);

export default {
  withId,
  withoutId,
};

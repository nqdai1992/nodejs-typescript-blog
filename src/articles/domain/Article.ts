import IArticle from './IArticle';

const Article = (id: string, authorId: string, content: string) => ({
  getId: () => id,
  toObject: (): IArticle => ({ id, authorId, content }),
});

const withoutId = (authorId: string, content: string) =>
  Article(null, authorId, content);
const withId = (id: string, authorId: string, content: string) =>
  Article(id, authorId, content);

export default {
  withId,
  withoutId,
};

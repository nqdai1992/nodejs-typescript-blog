export default class Article {
  constructor(
    readonly id: string,
    readonly authorId: string,
    readonly content: string,
    readonly description: string,
    readonly title: string,
    readonly type: string,
  ) {}

  static withId(
    id: string,
    authorId: string,
    content: string,
    description: string,
    title: string,
    type: string,
  ): Article {
    return new Article(id, authorId, content, description, title, type);
  }

  static withoutId(
    authorId: string,
    content: string,
    description: string,
    title: string,
    type: string,
  ): Article {
    return new Article(null, authorId, content, description, title, type);
  }
}

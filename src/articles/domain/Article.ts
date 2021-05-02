export default class Article {
  constructor (readonly id: string, readonly authorId: string, readonly content: string) {}

  static withId (id: string, authorId: string, content: string): Article {
    return new Article(id, authorId, content)
  }

  static withoutId (authorId: string, content: string): Article {
    return new Article(null, authorId, content)
  }
}
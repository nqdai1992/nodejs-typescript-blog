import IArticle from './IArticle'

type IArticleWithoutId = Omit<IArticle, 'id'>

export default IArticleWithoutId
const ArticleMustHasId = (articleId: string): string => {
    if (!articleId) throw new Error('ArticleId is required')
    return articleId
}

export default ArticleMustHasId
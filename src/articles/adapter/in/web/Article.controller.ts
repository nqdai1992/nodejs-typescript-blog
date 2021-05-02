import express from 'express';
import { URLPath } from '@src/utils';
import ArticleService from '@src/articles/application/services/ArticleService';

import ArticleMustHasId from '@src/articles/application/ports/in/ArticleMusHasId';
import UpdatingArticlePayloadIsValid from '@src/articles/application/ports/in/UpdatingArticlePayloadIsValid';
import CreatingArticlePayloadIsValid from '@src/articles/application/ports/in/CreatingArticlePayloadIsValid';
import IArticleService from '@src/articles/application/ports/in/IArticleService';

const router = express.Router();
const articlePath = URLPath('articles');
const articleService:IArticleService = new ArticleService()

router.get(articlePath.toString(), async (_req, res, next) => {
  try {
    const articles = await articleService.getAllArticle();

    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
});

router.get(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const articleId = ArticleMustHasId(req.params.id);
    const article = await articleService.getArticle(articleId);

    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
});

router.put(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const articleId = ArticleMustHasId(req.params.id);
    const updatingArticlePayload = UpdatingArticlePayloadIsValid(req.body);
    const updatedArticle = await articleService.updateArticle(
      articleId,
      updatingArticlePayload,
    );

    res.status(200).send(updatedArticle);
  } catch (err) {
    next(err);
  }
});

router.delete(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const articleId = ArticleMustHasId(req.params.id);
    await articleService.removeArticle(articleId);

    res.status(200).send('Remove the article successfully');
  } catch (err) {
    next(err);
  }
});

router.post(articlePath.toString(), async (req, res, next) => {
  try {
    const articlePayload = CreatingArticlePayloadIsValid(req.body);
    const newArticle = await articleService.createArticle(articlePayload);

    res.status(200).send(newArticle)
  } catch (err) {
    next(err);
  }
});

export default router;

import express from 'express';
import { URLPath } from '../../../../utils';
import {
  getAllArticle,
  getArticle,
  updateArticle,
  removeArticle,
  createArticle,
} from '../../../application/services/ArticleService';

import ArticleMustHasId from '../../../application/ports/in/ArticleMusHasId';
import UpdatingArticlePayloadIsValid from '../../../application/ports/in/UpdatingArticlePayloadIsValid';
import CreatingArticlePayloadIsValid from '../../../application/ports/in/CreatingArticlePayloadIsValid';

const router = express.Router();
const articlePath = URLPath('articles');

router.get(articlePath.toString(), async (_req, res, next) => {
  try {
    const articles = await getAllArticle();

    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
});

router.get(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const articleId = ArticleMustHasId(req.params.id);
    const article = await getArticle(articleId);

    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
});

router.put(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const articleId = ArticleMustHasId(req.params.id);
    const updatingArticlePayload = UpdatingArticlePayloadIsValid(req.body);
    const updatedArticle = await updateArticle(
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
    await removeArticle(articleId);

    res.status(200).send('Remove the article successfully');
  } catch (err) {
    next(err);
  }
});

router.post(articlePath.toString(), async (req, res, next) => {
  try {
    const articlePayload = CreatingArticlePayloadIsValid(req.body);
    const newArticle = await createArticle(articlePayload);

    res.status(200).send(newArticle)
  } catch (err) {
    next(err);
  }
});

export default router;

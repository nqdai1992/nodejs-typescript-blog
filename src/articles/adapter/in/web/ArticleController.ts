import express from 'express';
import { URLPath } from '@src/utils';
import ArticleService from '@src/articles/application/services/ArticleService';
import UpdatingArticlePayload from '@src/articles/application/ports/in/UpdatingArticlePayload';
import CreatingArticlePayload from '@src/articles/application/ports/in/CreatingArticlePayload';
import ArticleInPort from '@src/articles/application/ports/in/ArticleInPort';
import RemovingArticlePayload from '@src/articles/application/ports/in/RemovingArticlePayload';
import GettingOneArticlePayload from '@src/articles/application/ports/in/GettingOneArticlePayload';

const router = express.Router();
const articlePath = URLPath('articles');
const articleService:ArticleInPort = new ArticleService()

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
    const gettingOneArticlePayload = new GettingOneArticlePayload(req.params.id);
    const article = await articleService.getArticle(gettingOneArticlePayload);

    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
});

router.put(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const updatingArticlePayload = new UpdatingArticlePayload(req.params.id, req.body.authorId, req.body.content);
    const updatedArticle = await articleService.updateArticle(updatingArticlePayload);

    res.status(200).send(updatedArticle);
  } catch (err) {
    next(err);
  }
});

router.delete(articlePath.join(':id').toString(), async (req, res, next) => {
  try {
    const removeArticlePayload = new RemovingArticlePayload(req.params.id)
    await articleService.removeArticle(removeArticlePayload);

    res.status(200).send('Remove the article successfully');
  } catch (err) {
    next(err);
  }
});

router.post(articlePath.toString(), async (req, res, next) => {
  try {
    const articlePayload = new CreatingArticlePayload(req.body.authorId, req.body.content);
    const newArticle = await articleService.createArticle(articlePayload);

    res.status(200).send(newArticle)
  } catch (err) {
    next(err);
  }
});

export default router;

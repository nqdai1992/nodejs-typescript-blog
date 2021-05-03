import express, { NextFunction, Response } from 'express';
import errorHandler from '@src/common/ErrorHandler';
import ArticleController from '../articles/adapter/in/web/ArticleController';
import BaseError from '@src/common/BaseError';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(ArticleController);

app.use((err: Error, _req, res: Response, next: NextFunction) => {
  if (!errorHandler.isTrustedError(err)) {
    return next(err);
  }
  errorHandler.handleError(err);
  const { httpCode, message } = err as BaseError;
  res.status(httpCode).send(message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

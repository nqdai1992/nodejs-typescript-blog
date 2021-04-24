import express from 'express';
import ArticleController from '../articles/adapter/in/web/Article.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(ArticleController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

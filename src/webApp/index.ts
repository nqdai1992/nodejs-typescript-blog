import express from 'express';
import ArticleController from '../articles/adapter/in/web/ArticleController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(ArticleController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import express, { type Express, type Request, type Response } from 'express';
import { errorHandler } from './middleware/error-handler.ts';
import { productRoutes } from './modules/products/product.routes.ts';

export const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use(
  '/api/products',
  (_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //for development only (on production only fe domain)
    next();
  },
  productRoutes,
);
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});
app.use(errorHandler);

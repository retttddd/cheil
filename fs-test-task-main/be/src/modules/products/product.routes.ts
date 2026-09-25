import { Router } from 'express';
import { getProduct, getProducts } from './product.controller.ts';

export const productRoutes = Router();

productRoutes.get('/', getProducts);
productRoutes.get('/:code', getProduct); // stub route

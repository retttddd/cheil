import type { Request, Response } from 'express';
import { Product } from './product.model.ts';

export async function getProducts(_req: Request, res: Response): Promise<void> {
  const products = await Product.find();
  res.json(products);
}

export async function getProduct(req: Request<{ code: string }>, res: Response): Promise<void> {
    // this endpoint is not required, but it is considered a best practice
    //  to keep a single object get method if there is a get all method
  const product = await Product.findOne({ code: req.params.code }).lean();

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.json(product);
}

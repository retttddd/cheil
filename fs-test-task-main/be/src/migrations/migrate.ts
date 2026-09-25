import mongoose from 'mongoose';
import { connectToDatabase } from '../database.ts';
import { Product } from '../modules/products/product.model.ts';
import { products } from './products.ts';

async function migrate(): Promise<void> {
  try {
    await connectToDatabase();

    for (const product of products) {
      await Product.updateOne(
        { code: product.code },
        { $set: product },
        { upsert: true, runValidators: true },
      );
    }

    console.log(`Migrated ${products.length} products`);
  } finally {
    await mongoose.disconnect();
  }
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exitCode = 1;
});

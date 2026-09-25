import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  image: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  capacity: { type: Number, required: true },
  dimensions: { type: String, required: true },
  features: [String],
  energyClass: { type: String, enum: ['A', 'B', 'C'], required: true },
  price: {
    value: { type: Number, required: true },
    currency: { type: String, required: true },
    installment: {
      value: { type: Number, required: true },
      period: { type: Number, required: true },
    },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
  },
});

export const Product = model('Product', productSchema);

import { IProduct } from '../interfaces/product';

type ApiProduct = Omit<IProduct, 'price'> & {
  price: Omit<IProduct['price'], 'validFrom' | 'validTo'> & {
    validFrom: string;
    validTo: string;
  };
};

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);

  if (!response.ok) {
    throw new Error('Could load products');
  }

  const products: ApiProduct[] = await response.json();

  return products.map((product) => ({
    ...product,
    price: {
      //we have to convert dates here due to returned string
      ...product.price,
      validFrom: new Date(product.price.validFrom),
      validTo: new Date(product.price.validTo),
    },
  }));
};

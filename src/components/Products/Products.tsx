import { FunctionComponent, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { CurrencyFormatter } from '../CurrencyFormatter';
import classes from './products.module.scss';
import { Loader } from '../Loader';

const API_URL = 'https://dummyjson.com/products';

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  image: string;
  quantity?: number; // Optional to handle adding a new product
};

export interface CartProps {
  [productId: string]: Product;
}

export const Products: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});

  useEffect(() => {
    fetchData(API_URL);
  }, []);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }

  const addToCart = (product: Product): void => {
    setCart((prevCart = {}) => {
      const existingProduct = prevCart[product.id];

      // If the product already exists in the cart, increment the quantity
      if (existingProduct) {
        return {
          ...prevCart,
          [product.id]: {
            ...existingProduct,
            quantity: (existingProduct.quantity || 1) + 1,
          },
        };
      }

      // Otherwise, add the product to the cart with quantity 1
      return {
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: 1,
        },
      };
    });
  };

  if (error) {
    return <h3 className={classes.error}>An error occurred when fetching data. Please check the API and try again.</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.productPage}>
      <h1>Products</h1>

      <div className={classes.container}>
        {products.map((product) => (
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: <CurrencyFormatter amount={product.price} /></p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

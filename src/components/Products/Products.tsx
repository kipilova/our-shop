import { FunctionComponent, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { CurrencyFormatter } from '../CurrencyFormatter';
import classes from './products.module.scss';
import { Loader } from '../Loader';
import { getABTestVersion } from '../../utils/getABTestVersion';
import { DiscountBanner } from '../DiscountBanner/DiscountBanner';

const API_URL = 'https://dummyjson.com/products';

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  image: string;
  quantity?: number;
  discountPercentage?: number;
};

export interface CartProps {
  [productId: string]: Product;
}

export const Products: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const [buttonClicks, setButtonClicks] = useState(0); // Состояние для счётчика кликов
  const version = getABTestVersion();

  console.log(cart);

  const discountKeywords = ['mascara', 'essence', 'lipstick', 'calvin', 'bed', 'apple', 'pepper', 'kiwi'];

  const getRandomDiscount = (): number => {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  };

  const getDiscountedPrice = (price: number, discount: number): number => {
    return Math.round(price - (price * discount) / 100);
  };

  const hasDiscount = (title: string): boolean => {
    return discountKeywords.some((keyword) => title.toLowerCase().includes(keyword));
  };

  useEffect(() => {
    fetchData(API_URL);
  }, []);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const updatedProducts = data.products.map((product: Product) => {
          if (version === 'B' && hasDiscount(product.title)) {
            const discount = getRandomDiscount();
            return { ...product, discountPercentage: discount };
          }
          return product;
        });

        setProducts(updatedProducts);
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

      if (existingProduct) {
        return {
          ...prevCart,
          [product.id]: {
            ...existingProduct,
            quantity: (existingProduct.quantity || 1) + 1,
          },
        };
      }

      return {
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: 1,
        },
      };
    });

    // Увеличиваем счётчик кликов
    setButtonClicks((prevCount) => prevCount + 1);

    // Отправляем событие в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
      ym(99601397, 'reachGoal', 'addToCart', {
        productId: product.id,
        title: product.title,
        price: product.price,
        discount: product.discountPercentage || 0,
      });
    }

    console.log(`Метрика: Товар ${product.title} добавлен в корзину.`);
  };

  if (error) {
    return <h3 className={classes.error}>An error occurred when fetching data. Please check the API and try again.</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.productPage}>
      <h1>Товары</h1>
      <p>Количество нажатий на кнопки: {buttonClicks}</p> {/* Отображение счётчика */}
      <div className={classes.container}>
        {products.map((product) => (
          <div className={classes.product} key={product.id} style={{ position: 'relative' }}>
            {version === 'B' && hasDiscount(product.title) && (
              <DiscountBanner discountText={`Скидка ${product.discountPercentage}%`} />
            )}
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>
              {version === 'B' && hasDiscount(product.title) && product.discountPercentage ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '10px' }}>
                    <CurrencyFormatter amount={product.price} />
                  </span>
                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                    <CurrencyFormatter amount={getDiscountedPrice(product.price, product.discountPercentage)} />
                  </span>
                </>
              ) : (
                <span>
                  <CurrencyFormatter amount={product.price} />
                </span>
              )}
            </p>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </section>
  );
};

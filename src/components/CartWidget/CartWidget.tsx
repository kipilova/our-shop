import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

import shoppingCart from '../../assets/shopping-cart.svg';
import classes from './cart-widget.module.scss';

export const CartWidget: FunctionComponent = () => {
  const navigate = useNavigate();
  const [cart] = useLocalStorageState('cart', {}); // Access the cart from local storage

  // Calculate the total number of items in the cart
  const productsCount = Object.values(cart || {}).reduce(
    (total, product) => total + (product.quantity || 0),
    0
  );

  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <button className={classes.container} onClick={navigateToCart}>
      <span className={classes.productsCount}>{productsCount}</span>
      <img src={shoppingCart} className={classes.shoppingCart} alt="Go to Cart" />
    </button>
  );
};

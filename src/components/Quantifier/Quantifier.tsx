import { FunctionComponent, useEffect, useState } from 'react';

import classes from './quantifier.module.scss';

export type Operation = 'decrease' | 'increase';

interface Props {
  removeProductCallback: (productId: number) => void;
  handleUpdateQuantity: (productId: number, operation: Operation) => void;
  productId: number;
  quantity: number; // Added to reflect actual quantity from cart
}

export const Quantifier: FunctionComponent<Props> = ({
  removeProductCallback,
  handleUpdateQuantity,
  productId,
  quantity,
}) => {
  const [value, setValue] = useState<number>(quantity);

  useEffect(() => {
    setValue(quantity); // Sync with cart state
  }, [quantity]);

  const reduce = (): void => {
    if (value > 1) {
      handleUpdateQuantity(productId, 'decrease');
      setValue(value - 1);
    } else {
      removeProductCallback(productId);
    }
  };

  const increase = (): void => {
    handleUpdateQuantity(productId, 'increase');
    setValue(value + 1);
  };

  return (
    <div className={classes.quantifier}>
      <input
        type="button"
        value="-"
        className={classes.buttonMinus}
        onClick={reduce}
      />
      <input
        type="number"
        value={value}
        readOnly
        className={classes.quantityField}
      />
      <input
        type="button"
        value="+"
        className={classes.buttonPlus}
        onClick={increase}
      />
    </div>
  );
};

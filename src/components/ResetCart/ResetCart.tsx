import useLocalStorageState from 'use-local-storage-state';

export const ResetCartButton = () => {
  const [, setCart] = useLocalStorageState('cart', {});

  const resetCart = () => {
    setCart({});
  };

  return (
    <button onClick={resetCart}>Reset Cart</button>
  );
};

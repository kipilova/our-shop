import React from 'react';

interface DiscountBannerProps {
    discountText: string;
}

export const DiscountBanner: React.FC<DiscountBannerProps> = ({ discountText }) => {
    return (
        <div
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 'bold',
            position: 'absolute',
            top: '10px',
            left: '80px',
          }}
        >
          {discountText}
        </div>
      );
};

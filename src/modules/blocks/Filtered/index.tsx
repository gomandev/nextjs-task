import { Button } from '@modules/atoms/button';
import Image from 'next/image';
import { FC } from 'react';

type Product = {
  product: any;
  url: string;
  onclick: Function;
  key: number;
};
export const Filtered: FC<Product> = ({ product, url, onclick, key }) => (
  <div key={key} className="product-grid">
    <div className="image-wrapper">
      <Image
        src={`https:${url}`}
        alt="Picture of the author"
        width={289}
        height={390}
      />
      <div className="button-wrapper">
        <Button onClick={() => onclick(product)}>ADD TO CART</Button>
      </div>
    </div>
    <div className="details">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-tag">{product.categories.categories}</p>
      <p className="product-price">${product.price}</p>
    </div>
  </div>
);

import { Button } from '@modules/atoms/button';
import Image from 'next/image';
import { FC, useState } from 'react';

type Product = {
  products: any;
  open: boolean;
  onclick: any;
};

export const MastHead: FC<Product> = ({ products, open, onclick }) => {
  const [isFeatured, setIsFeatured] = useState(null);
  if (products !== null) {
    const featured = products
      .filter((product: any) => {
        if (product.fields.featured === true) return product.fields;
      })
      .map((p: any) => {
        const {
          name, image, category, details,
        } = p.fields;
        const {
          recommended, dimmentions, size, description,
        } = details;
        const { url } = image.fields.file;
        console.log(url);
        return (
          <>
            <div className="top mb-10">
              <div className="flex justify-between">
                <p className="title">{name}</p>
                <Button onClick={() => onclick(p)}>ADD TO CART</Button>
              </div>
            </div>
            <div className="middle">
              <Image
                src={`https:${url}`}
                alt="Picture of the author"
                className="w-full"
                // style={{ width: '1500px', height: '553' }}
                width={1500}
                height={553}
                layout="responsive"
              />
              <div className="bg-white text-black badge flex justify-center items-center flex-col">
                <p>Photo of the day</p>
              </div>
            </div>
            <div className="bottom mt-12 mb-24">
              <div className="flex">
                <div className="description" style={{ flexBasis: '60%' }}>
                  <h1 className="subtitle">{name}</h1>
                  <p className="tag mt-3">{category}</p>
                  <p className="text mt-3">{description}</p>
                </div>
                <div
                  className="recommended flex flex-col items-end"
                  style={{ flexBasis: '40%' }}
                >
                  <h1 className="subtitle mb-4">People also buy</h1>
                  <div className="flex mb-12">
                    {recommended.map((r: any) => {
                      const { url } = r.fields.file;
                      return (
                        <div className="ml-5">
                          <Image
                            src={`https:${url}`}
                            alt="Picture of the author"
                            width={117}
                            height={147}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <h1 className="subtitle mb-2">Details</h1>
                  <p className="text mb-2">
                    Size:
                    {' '}
                    {dimmentions.width}
                    {' '}
                    x
                    {' '}
                    {dimmentions.height}
                    {' '}
                    pixel
                  </p>
                  <p className="text">
                    Size:
                    {size}
                    {' '}
                    mb
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      });

    return <div className="head-wrapper mt-12">{featured}</div>;
  }
  return <p>loading!</p>;
};

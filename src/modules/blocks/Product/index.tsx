import { Button } from '@modules/atoms/button';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilter,
  filterPrice,
  filterProduct,
  productSelector,
} from 'store/ducks/products';
import { Checkbox } from '@modules/atoms/checkbox';
import { Filtered } from '../Filtered';

const PER_PAGE = 6;
type Product = {
  products: any;
  onclick: Function;
  filtered: any;
  filteredProducts: Array<[]>;
  handleCheckbox: Function;
  setOpenFilter: any;
  list: boolean;
};
export const Product: FC<Product> = (
  {
    products,
    onclick,
    filtered,
    filteredProducts,
    handleCheckbox,
    setOpenFilter,
    list,
  },
  index: number,
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [priceSort, setPriceSort] = useState(null);
  const [selected, setSelected] = useState(null);
  const [ascending, setAscending] = useState(null);
  const [descending, setDescending] = useState(null);
  const [alphabetSort, setAlphabetSort] = useState(null);
  const [desce, setDesce] = useState(false);
  const [asce, setAsce] = useState(false);
  const [fbool, setFbool] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const [flist, setFList] = useState(null);
  const dispatch = useDispatch();

  function handlePageClick({ selected: selectedPage }: any) {
    setCurrentPage(selectedPage);
  }

  const filteredPrice = useMemo(() => filtered, [filtered, checked, checked2]);

  const handleCheckbox2 = (e) => {
    const payload = {
      event: e.target.value,
      checked: e.target.checked,
    };
    if (!e.target.checked) {
      dispatch(clearFilter());
    } else {
      dispatch(filterPrice(payload));
    }
    setChecked2(!checked);
    setChecked(false);
    setChecked3(false);
    setChecked4(false);
  };

  const handleCheckbox3 = (e) => {
    const payload = {
      event: e.target.value,
      checked: e.target.checked,
    };

    if (!e.target.checked) {
      dispatch(clearFilter());
    } else {
      dispatch(filterPrice(payload));
    }
    setChecked3(true);
    setChecked2(false);
    setChecked(false);
    setChecked4(false);
  };

  const handleCheckbox4 = (e) => {
    const payload = {
      event: e.target.value,
      checked: e.target.checked,
    };
    if (!e.target.checked) {
      dispatch(clearFilter());
    } else {
      dispatch(filterPrice(payload));
    }
    setChecked4(!checked);
    setChecked(false);
    setChecked2(false);
    setChecked3(false);
  };

  const handleCheckbox1 = (e) => {
    const payload = {
      event: e.target.value,
      checked: e.target.checked,
    };
    if (payload.checked) {
      dispatch(clearFilter());
    }
    dispatch(filterPrice(payload));
    setChecked(!checked);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
  };

  const sort = (e) => {
    const keyword = e.target.value;
    setSelected(keyword);
    if (keyword === 'price') {
      const pSort = products
        .slice(offset, offset + PER_PAGE)
        .sort((a, b) => a.fields.price - b.fields.price)
        .map((p: any, index: number) => {
          const {
            name, image, categories, price,
          } = p.fields;
          const { url } = image.fields.file;
          return (
            <div key={index} className="product-grid">
              <div className="image-wrapper">
                <Image
                  src={`https:${url}`}
                  alt="Picture of the author"
                  width={289}
                  height={390}
                />
                <div className="button-wrapper">
                  <Button onClick={() => onclick(p)}>ADD TO CART</Button>
                </div>
              </div>
              <div className="details">
                <h1 className="product-title">{name}</h1>
                {categories.categories.map((c) => (
                  <p className="product-tag">{c}</p>
                ))}
                <p className="product-price">
                  $
                  {price}
                </p>
              </div>
            </div>
          );
        });

      setPriceSort(pSort);
    }
    if (keyword === 'alphabetically') {
      const aSort = products
        .slice(offset, offset + PER_PAGE)
        .sort((a, b) => a.fields.name.localeCompare(b.fields.name))
        .map((p: any, index: number) => {
          const {
            name, image, categories, price,
          } = p.fields;
          const { url } = image.fields.file;
          return (
            <div key={index} className="product-grid">
              <div className="image-wrapper">
                <Image
                  src={`https:${url}`}
                  alt="Picture of the author"
                  width={289}
                  height={390}
                />
                <div className="button-wrapper">
                  <Button onClick={() => onclick(p)}>ADD TO CART</Button>
                </div>
              </div>
              <div className="details">
                <h1 className="product-title">{name}</h1>
                {categories.categories.map((c) => (
                  <p className="product-tag">{c}</p>
                ))}
                <p className="product-price">
                  $
                  {price}
                </p>
              </div>
            </div>
          );
        });
      setAlphabetSort(aSort);
    }
  };

  const pageCount = Math.ceil(products.length / PER_PAGE);
  const filterCount = Math.ceil(filteredProducts.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;
  const currentPagecontacts: any = products
    .slice(offset, offset + PER_PAGE)
    .map((p: any, index: number) => {
      const {
        name, image, categories, price, bestseller,
      } = p.fields;
      const { url } = image.fields.file;
      return (
        <div key={index} className="product-grid">
          <div className="image-wrapper">
            <Image
              src={`https:${url}`}
              alt="Picture of the author"
              width={289}
              height={390}
            />
            {bestseller ? (
              <div className="indecator">
                <p>Best Seller</p>
              </div>
            ) : (
              ''
            )}
            <div className="button-wrapper">
              <Button onClick={() => onclick(p)}>ADD TO CART</Button>
            </div>
          </div>
          <div className="details">
            <h1 className="product-title">{name}</h1>
            {categories.categories.map((c) => (
              <p className="product-tag">{c}</p>
            ))}
            <p className="product-price">
              $
              {price}
            </p>
          </div>
        </div>
      );
    });
  const asc = () => {
    const a = products
      .slice(offset, offset + PER_PAGE)
      .sort((a, b) => a.fields.price - b.fields.price)
      .map((p: any, index: number) => {
        const {
          name, image, categories, price,
        } = p.fields;
        const { url } = image.fields.file;
        return (
          <div key={index} className="product-grid">
            <div className="image-wrapper">
              <Image
                src={`https:${url}`}
                alt="Picture of the author"
                width={289}
                height={390}
              />
              <div className="button-wrapper">
                <Button onClick={() => onclick(p)}>ADD TO CART</Button>
              </div>
            </div>
            <div className="details">
              <h1 className="product-title">{name}</h1>
              {categories.categories.map((c) => (
                <p className="product-tag">{c}</p>
              ))}
              <p className="product-price">
                $
                {price}
              </p>
            </div>
          </div>
        );
      });
    setAscending(a);
    setDesce(false);
    setAsce(!asce);
  };

  const desc = () => {
    const d = products
      .slice(offset, offset + PER_PAGE)
      .sort((a, b) => b.fields.price - a.fields.price)

      .map((p: any, index: number) => {
        const {
          name, image, categories, price,
        } = p.fields;
        const { url } = image.fields.file;
        return (
          <div key={index} className="product-grid">
            <div className="image-wrapper">
              <Image
                src={`https:${url}`}
                alt="Picture of the author"
                width={289}
                height={390}
              />
              <div className="button-wrapper">
                <Button onClick={() => onclick(p)}>ADD TO CART</Button>
              </div>
            </div>
            <div className="details">
              <h1 className="product-title">{name}</h1>
              {categories.categories.map((c) => (
                <p className="product-tag">{c}</p>
              ))}
              <p className="product-price">
                $
                {price}
              </p>
            </div>
          </div>
        );
      });
    setDescending(d);
    setAsce(false);
    setDesce(!desce);
  };
  const fil = () => {
    const f = filteredPrice
      .slice(offset, offset + PER_PAGE)
      .sort((a, b) => b.fields.price - a.fields.price)
      .map((p: any, index: number) => {
        const {
          name, image, categories, price, bestseller,
        } = p.fields;
        const { url } = image.fields.file;
        return (
          <div key={index} className="product-grid">
            <div className="image-wrapper">
              <Image
                src={`https:${url}`}
                alt="Picture of the author"
                width={289}
                height={390}
              />
              {bestseller ? (
                <div className="indecator">
                  <p>Best Seller</p>
                </div>
              ) : (
                ''
              )}

              <div className="button-wrapper">
                <Button onClick={() => onclick(p)}>ADD TO CART</Button>
              </div>
            </div>
            <div className="details">
              <h1 className="product-title">{name}</h1>
              {categories.categories.map((c) => (
                <p className="product-tag">{c}</p>
              ))}
              <p className="product-price">
                $
                {price}
              </p>
            </div>
          </div>
        );
      });
    setFList(f);
    setFbool(true);
  };
  const renderSort = () => {
    if (selected === 'price') {
      return priceSort;
    }
    if (selected === 'alphabetically') {
      return alphabetSort;
    }
    if (asce) {
      return ascending;
    }
    if (desce) {
      return descending;
    }
    if (fbool) {
      return flist;
    }
    return currentPagecontacts;
  };

  return (
    <div className="product-wrapper">
      <div className="top-list">
        <div className="flex justify-between">
          <div className="breadcrumbs flex">
            <p>Photography</p>
            {' '}
            /
            <span>Premium Photos</span>
          </div>
          <div className="sort flex">
            <div className="flex mt-4 mr-3">
              <span onClick={() => asc()}>
                <svg
                  width="7"
                  height="15"
                  viewBox="0 0 7 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.64807 14.3734V1.5347L5.90435 3.79098C5.97793 3.86456 6.07296 3.90134 6.17106 3.90134C6.26916 3.90134 6.36419 3.86456 6.43777 3.79098C6.58492 3.64383 6.58492 3.40778 6.43777 3.26063L3.54077 0.363637C3.39976 0.222619 3.15144 0.222619 3.01042 0.363637L0.110362 3.26063C-0.0367873 3.40778 -0.0367873 3.64383 0.110362 3.79098C0.257511 3.93813 0.493562 3.93813 0.640711 3.79098L2.897 1.5347V14.3734C2.897 14.5819 3.0656 14.7505 3.27407 14.7505C3.47946 14.7474 3.64807 14.5788 3.64807 14.3734Z"
                    fill="black"
                  />
                </svg>
              </span>
              <span onClick={() => desc()}>
                <svg
                  width="7"
                  height="15"
                  viewBox="0 0 7 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.45919 14.6367C3.53276 14.7103 3.6278 14.7471 3.7259 14.7471C3.824 14.7471 3.91903 14.7103 3.99261 14.6367L6.8896 11.7397C7.03675 11.5926 7.03675 11.3565 6.8896 11.2094C6.74245 11.0622 6.5064 11.0622 6.35925 11.2094L4.10297 13.4657V0.626917C4.10297 0.418456 3.93436 0.249847 3.7259 0.249847C3.51744 0.249847 3.34883 0.418456 3.34883 0.626917V13.4657L1.09561 11.2094C0.948458 11.0622 0.712406 11.0622 0.565257 11.2094C0.418108 11.3565 0.418108 11.5926 0.565257 11.7397L3.45919 14.6367Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
            <div className="flex">
              <p className="sortby mr-3">Sortby</p>
              <select onChange={(e) => sort(e)} className="sort-select">
                <option value="select">Select Option</option>
                <option value="price">Price</option>
                <option value="alphabetically">Alphabetically</option>
              </select>
            </div>
          </div>
          <div onClick={() => setOpenFilter(true)} className="filters hidden">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.8119 0H5.18805C2.32736 0 0 2.32736 0 5.18805V23.812C0 26.6726 2.32736 29 5.18805 29H23.812C26.6726 29 29 26.6726 29 23.8119V5.18805C29 2.32736 26.6726 0 23.8119 0ZM27.3008 23.8119C27.3008 25.7357 25.7357 27.3008 23.8119 27.3008H5.18805C3.26431 27.3008 1.69922 25.7357 1.69922 23.8119V5.18805C1.69922 3.26431 3.26431 1.69922 5.18805 1.69922H23.812C25.7357 1.69922 27.3008 3.26431 27.3008 5.18805V23.8119Z"
                fill="black"
              />
              <path
                d="M24.5103 6.3702H11.5701C11.2143 5.31357 10.2149 4.55017 9.03986 4.55017C7.86479 4.55017 6.86537 5.31357 6.50961 6.3702H4.48975C4.02054 6.3702 3.64014 6.7506 3.64014 7.21981C3.64014 7.68902 4.02054 8.06942 4.48975 8.06942H6.50966C6.86542 9.12605 7.86485 9.88946 9.03991 9.88946C10.215 9.88946 11.2144 9.12605 11.5702 8.06942H24.5103C24.9795 8.06942 25.3599 7.68902 25.3599 7.21981C25.3599 6.7506 24.9795 6.3702 24.5103 6.3702ZM9.03986 8.19024C8.50477 8.19024 8.06943 7.7549 8.06943 7.21981C8.06943 6.68473 8.50477 6.24939 9.03986 6.24939C9.57494 6.24939 10.0103 6.68473 10.0103 7.21981C10.0103 7.7549 9.57494 8.19024 9.03986 8.19024Z"
                fill="black"
              />
              <path
                d="M24.5103 13.6504H22.4904C22.1346 12.5938 21.1351 11.8304 19.9601 11.8304C18.7851 11.8304 17.7857 12.5938 17.4299 13.6504H4.48975C4.02054 13.6504 3.64014 14.0308 3.64014 14.5C3.64014 14.9692 4.02054 15.3496 4.48975 15.3496H17.4299C17.7857 16.4063 18.7852 17.1697 19.9602 17.1697C21.1352 17.1697 22.1347 16.4063 22.4904 15.3496H24.5103C24.9795 15.3496 25.3599 14.9692 25.3599 14.5C25.3599 14.0308 24.9795 13.6504 24.5103 13.6504ZM19.9602 15.4704C19.4251 15.4704 18.9897 15.0351 18.9897 14.5C18.9897 13.9649 19.4251 13.5296 19.9602 13.5296C20.4953 13.5296 20.9306 13.9649 20.9306 14.5C20.9306 15.0351 20.4953 15.4704 19.9602 15.4704Z"
                fill="black"
              />
              <path
                d="M24.5103 20.9306H15.2102C14.8545 19.8739 13.855 19.1105 12.68 19.1105C11.5049 19.1105 10.5055 19.8739 10.1497 20.9306H4.48975C4.02054 20.9306 3.64014 21.311 3.64014 21.7802C3.64014 22.2494 4.02054 22.6298 4.48975 22.6298H10.1497C10.5055 23.6864 11.5049 24.4498 12.68 24.4498C13.855 24.4498 14.8545 23.6864 15.2102 22.6298H24.5103C24.9795 22.6298 25.3599 22.2494 25.3599 21.7802C25.3599 21.311 24.9795 20.9306 24.5103 20.9306ZM12.68 22.7507C12.1449 22.7507 11.7096 22.3153 11.7096 21.7802C11.7096 21.2452 12.1449 20.8098 12.68 20.8098C13.2151 20.8098 13.6504 21.2451 13.6504 21.7802C13.6504 22.3153 13.2151 22.7507 12.68 22.7507Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="middle-list h-full">
        <div className="flex">
          <div className="side-bar" style={{ flexBasis: '20%' }}>
            <h1 className="subtitle mb-10">Categoriescategories</h1>
            <ul style={{ borderBottom: '1px solid #C2C2C2' }}>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="People" />
                People
              </li>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="Premium" />
                Premium
              </li>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="Pets" />
                Pets
              </li>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="Food" />
                Food
              </li>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="Landmark" />
                Landmark
              </li>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="Cities" />
                Cities
              </li>
              <li>
                <Checkbox onChange={(e) => handleCheckbox(e)} value="Nature" />
                Nature
              </li>
            </ul>
            <h1 className="subtitle mb-10 mt-5">Price Range</h1>
            <ul>
              <li>
                <Checkbox
                  onChange={(e) => handleCheckbox1(e)}
                  value="$20"
                  checked={checked}
                />
                Less Tan $20
              </li>
              <li>
                <Checkbox
                  onChange={(e) => handleCheckbox2(e)}
                  value="$20 - $100"
                  checked={checked2}
                />
                $20 - $100
              </li>
              <li>
                <Checkbox
                  onChange={(e) => handleCheckbox3(e)}
                  value="$100 - $200"
                  checked={checked3}
                />
                $100 - $200
              </li>
              <li>
                <Checkbox
                  onChange={(e) => handleCheckbox4(e)}
                  value="More than $200"
                  checked={checked4}
                />
                More than $200
              </li>
            </ul>
          </div>
          <div className="product-list ml-36 mb-12" style={{ flexBasis: '80%' }}>
            <div className="product-list-wrapper">
              {filteredPrice.length ? (
                filteredPrice
                  .slice(offset, offset + PER_PAGE)
                  .map((p: any, index: number) => {
                    const { url } = p.image.fields.file;
                    return (
                      <Filtered
                        key={index}
                        onclick={onclick}
                        product={p}
                        url={url}
                      />
                    );
                  })
              ) : (
                <>
                  {list
                    ? filteredProducts
                      .slice(offset, offset + PER_PAGE)
                      .map(({ fields }: any, index: number) => {
                        const { url } = fields.image.fields.file;
                        return (
                          <Filtered
                            onclick={onclick}
                            product={fields}
                            url={url}
                            key={index}
                          />
                        );
                      })
                    : renderSort()}
                </>
              )}
            </div>
            <div className="flex flex-col justify-center items-center">
              <ReactPaginate
                previousLabel={<i className="fas fa-chevron-left" />}
                nextLabel={<i className="fas fa-chevron-right" />}
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={0}
                breakLabel="..."
                onPageChange={handlePageClick}
                containerClassName="pagination"
                previousLinkClassName="pagination__link"
                nextLinkClassName="pagination__link"
                disabledClassName="pagination__link--disabled"
                activeClassName="pagination__link--active"
                activeLinkClassName="active-paginate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

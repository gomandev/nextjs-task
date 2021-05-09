import Head from 'next/head';
import Image from 'next/image';
import contentful from '../utils/contentful';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useMemo, useState } from 'react';
import { Container } from '@modules/sections/Container';
import { Navbar } from '@modules/sections/Navbar';
import { MastHead } from '@modules/sections/MasterHead';
import { Product } from '@modules/blocks/Product';
import { Checkbox } from '@modules/atoms/checkbox';
import { Button } from '@modules/atoms/button';
import {
  productSelector,
  handleCart,
  filterPrice,
  clearFilter,
  feedInProducts,
} from '../store/ducks/products';

export default function Home({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [list, setList] = useState(false);
  const [isChacked, setIsChacked] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feedInProducts(data));
  }, []);
  const { product, cart, filtered } = useSelector(productSelector);

  const onclick = (p: any) => {
    dispatch(handleCart(p));
    setIsOpen(true);
  };
  let filteredProducts = useMemo(() => {
    const hasCategoryFilter = Object.values(isChacked).includes(true);

    const matchesCategories = perfume => {
      if (hasCategoryFilter) {
        return perfume.fields.categories.categories.some(
          category => isChacked[category] === true,
        );
      }
      return true;
    };

    return product.filter(matchesCategories);
  }, [product, isChacked]);

  const handleFilterClear = () => {
    dispatch(clearFilter());
    setOpenFilter(false);
    if (filteredProducts.length) {
      filteredProducts = [];
    }
  };
  const handleCheckbox = e => {
    setIsChacked(prev => ({
      ...prev,
      [e.target.value]: e.target.checked,
    }));
    setList(true);
  };
  const handleCheckbox2 = e => {
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

  const handleCheckbox3 = e => {
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

  const handleCheckbox4 = e => {
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

  const handleCheckbox1 = e => {
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

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Bejamas task for front-end role" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
      </Head>

      <Container>
        <Navbar open={isOpen} setOpen={setIsOpen} cart={cart} />
        <MastHead onclick={onclick} products={product} open={isOpen} />
        <Product
          setOpenFilter={setOpenFilter}
          filteredProducts={filteredProducts}
          handleCheckbox={handleCheckbox}
          onclick={onclick}
          filtered={filtered}
          products={product}
          list={list}
        />
        {/* {story
          ? story.content.body.map(blok => (
              <DynamicComponent blok={blok} key={blok._uid} />
            ))
          : null} */}
      </Container>
      {openFilter && (
        <div className="filter-container">
          <div className="filter-inner">
            <div className="filter-card">
              <div style={{ position: 'relative' }}>
                <div
                  style={{ overflow: 'scroll', height: '45vh' }}
                  className="filter-bar"
                >
                  <div className="flex justify-between">
                    <h1 className="subtitle mb-10">Filter</h1>
                    <i
                      onClick={() => setOpenFilter(false)}
                      style={{ fontSize: '2em', cursor: 'pointer' }}
                      className="fas fa-times"
                    />
                  </div>
                  <ul style={{ borderBottom: '1px solid #C2C2C2' }}>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="People" />
                      People
                    </li>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="Premium" />
                      Premium
                    </li>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="Pets" />
                      Pets
                    </li>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="Food" />
                      Food
                    </li>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="Landmark" />
                      Landmark
                    </li>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="Cities" />
                      Cities
                    </li>
                    <li>
                      <Checkbox onChange={e => handleCheckbox(e)} value="Nature" />
                      Nature
                    </li>
                  </ul>
                  <h1 className="subtitle mb-10 mt-5">Price Range</h1>
                  <ul>
                    <li>
                      <Checkbox
                        onChange={e => handleCheckbox1(e)}
                        value="$20"
                        checked={checked}
                      />
                      Less Tan $20
                    </li>
                    <li>
                      <Checkbox
                        onChange={e => handleCheckbox2(e)}
                        value="$20 - $100"
                        checked={checked2}
                      />
                      $20 - $100
                    </li>
                    <li>
                      <Checkbox
                        onChange={e => handleCheckbox3(e)}
                        value="$100 - $200"
                        checked={checked3}
                      />
                      $100 - $200
                    </li>
                    <li>
                      <Checkbox
                        onChange={e => handleCheckbox4(e)}
                        value="More than $200"
                        checked={checked4}
                      />
                      More than $200
                    </li>
                  </ul>
                </div>
                <div className="filter-bottom w-fill justify-between flex">
                  <Button onClick={() => handleFilterClear()} width="150" outline>
                    Clear
                  </Button>
                  <Button onClick={() => setOpenFilter(false)} width="150">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const data = await contentful.getEntries();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data.items }, // will be passed to the page component as props
  };
}

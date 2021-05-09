import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import contentful from '../../utils/contentful';

export interface Products {
  product: null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface Params {
  version: string;
  cv?: any;
}

export type ProductState = {
  product: any[];
  cart: any[];
  filtered: any[];
  added?: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type ProductAction = {
  type: string;
  payload: Products;
};

const initialState: ProductState = {
  product: [],
  cart: [],
  filtered: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
};

export const products: any = createAsyncThunk('products/all', async () => {
  try {
    const data = await contentful.getEntries();

    return data.items;
  } catch (e) {}
});

export const productSlice: any = createSlice({
  name: 'product',
  initialState,
  reducers: {
    handleCart: (state, { payload }): any =>
      void state.product.filter(item => {
        if (item.sys.id === payload.sys.id) {
          return state.cart.push(item.fields);
        }
      }),
    clearState: state => {
      state.cart = [];

      return state;
    },

    filterProduct: (state, { payload }): any =>
      void state.product.filter(item => {
        if (payload.checked) {
          return state.filtered.push(item.fields);
        }
        return state.filtered;
      }),
    filterPrice: (state, { payload }): any =>
      void state.product.filter(item => {
        const hundred = _.inRange(item.fields.price, 20, 100);
        const twohundred = _.inRange(item.fields.price, 100, 200);
        if (payload.event === '$20' && item.fields.price <= 20) {
          if (!payload.checked) {
            return (state.filtered = []);
          }
          return state.filtered.push(item.fields);
        }
        if (payload.event === '$20 - $100' && hundred) {
          return state.filtered.push(item.fields);
        }
        if (payload.event === '$100 - $200' && twohundred) {
          return state.filtered.push(item.fields);
        }
        if (
          payload.event === 'More than $200' &&
          item.fields.price >= 200 &&
          payload.checked
        ) {
          return state.filtered.push(item.fields);
        }
      }),
    clearFilter: (state, { payload }) => {
      state.filtered = [];
      return state;
    },
  },
  extraReducers: {
    [products.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.product = payload;
      return state;
    },
    [products.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [products.pending]: state => {
      state.isFetching = true;
    },
  },
});

export const {
  handleCart,
  clearState,
  filterProduct,
  filterPrice,
  clearFilter,
} = productSlice.actions;

export const productSelector = (state: any) => state.product;

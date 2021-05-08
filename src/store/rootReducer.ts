import { combineReducers } from '@reduxjs/toolkit';
import { productSlice } from '../store/ducks/products';

const rootReducer = combineReducers({
  product: productSlice.reducer,
});

export type RootState = ReturnType<typeof Object>;

export default rootReducer;

import { createReducer, on } from '@ngrx/store';
import { updateProduct } from './product.action';
import { ProductModel } from '../model/product.model';

export interface ProductState {
  selectedProduct: ProductModel | null;
}

export const initialState: ProductState = {
  selectedProduct: null
};

export const productReducer = createReducer(
  initialState,
  on(updateProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product
  }))
);

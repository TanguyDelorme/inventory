import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../model/product.model';

export const updateProduct = createAction(
  '[Product Component] Update',
  props<{ product: ProductModel }>()
);

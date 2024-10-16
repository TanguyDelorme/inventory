import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateProduct } from '../../core/store/product.action';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductModel } from '../../core/model/product.model';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {

  product$: Observable<ProductModel | null>;
  // counter = 0;

  constructor(private store: Store<{ product: { selectedProduct: ProductModel | null } }>) {
    this.product$ = store.select(state => state.product.selectedProduct);
  }

  increment() {
    // this.store.dispatch(updateProduct());
  }

  // getCount() {
  //  return this.counter;
  // }
}

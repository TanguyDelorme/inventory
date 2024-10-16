import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { mockProducts } from '../../core/mock/product.mock';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../core/model/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateProduct } from '../../core/store/product.action';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  productMocks = signal(mockProducts);
  displayedColumns: string[] = ['name', 'reference', 'brand', 'price', 'action'];
  dataSource: MatTableDataSource<ProductModel> = new MatTableDataSource<ProductModel>([]);
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<{ count: number }>) {
    effect(() => {
      this.dataSource = new MatTableDataSource(this.productMocks());
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.productMocks());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(product: ProductModel): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: product,
      width: '500px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.productMocks().findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.productMocks.update(products => {
            const updatedProducts = [...products];
            updatedProducts[index] = result;
            return updatedProducts;
          });
        }
      }
    });
  }

  add(): void{
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '500px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productMocks.update(products => [...products, result]);
      }
    });
  }

  delete(product: ProductModel): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { name: product.name },
      width: '500px',
      height: '150px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productMocks.update(products => products.filter(p => p.id !== product.id));
      }
    });
  }

  setProduct(product: ProductModel) {
    this.store.dispatch(updateProduct({ product }));
  }
}

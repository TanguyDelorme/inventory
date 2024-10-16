import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductModel } from '../../core/model/product.model';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  formProduct: FormGroup = this.formBuilder.group({});
  isUpdate = false;

  product = this.data;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<UpdateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductModel) {
  }

  ngOnInit() {
    this.isUpdate = !!this.product;
    this.formProduct = this.formBuilder.group({
      name: [this.product?.name, Validators.required],
      reference: [this.product?.reference, Validators.required],
      brand: [this.product?.brand, Validators.required],
      price: [this.product?.price]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.formProduct.invalid) {
      return;
    }

    const product: ProductModel = this.formProduct.value;
    if (this.isUpdate) {
      product.id = this.product.id;
    }

    this.dialogRef.close(product);
  }

}

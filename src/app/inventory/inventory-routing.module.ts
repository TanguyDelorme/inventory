import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./inventory/inventory.component').then(c => c.InventoryComponent)
  },
  {
    path: 'product/:id',
    component: DetailProductComponent
    // loadComponent: () => import('./detail-product/detail-product.component').then(c => c.DetailProductComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }

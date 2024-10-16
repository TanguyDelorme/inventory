import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inventory/inventory-routing.module').then(c => c.InventoryRoutingModule)
  }
];

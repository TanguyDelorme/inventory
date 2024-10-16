import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { productReducer } from './core/store/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideStore({ product: productReducer })]
};

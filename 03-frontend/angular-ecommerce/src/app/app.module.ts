import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailComponentComponent } from './components/cart-detail-component/cart-detail-component.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes : Routes = [
  {path : 'checkout' , component : CheckoutComponent},
  {path : 'cart-details', component : CartDetailComponentComponent},
  {path : 'products/:id', component : ProductDetailComponent},
  {path : 'search/:keyword', component : ProductListComponent},
  {path : 'category/:id', component : ProductListComponent},
  {path : 'category', component : ProductListComponent},
  {path : 'products', component : ProductListComponent},
  {path : '' , redirectTo : '/products', pathMatch : 'full'},
  {path : '**' , redirectTo : '/products', pathMatch : 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    CartDetailComponentComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

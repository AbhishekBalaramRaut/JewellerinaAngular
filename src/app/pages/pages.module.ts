import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './category/product/product.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { PortalContentComponent } from '../portal-layout/portal-content/portal-content.component';
import { HomeComponent } from './home/home.component';
import { PortalLayoutComponent } from '../portal-layout/portal-layout.component';
import { PortalHeaderComponent } from '../portal-layout/portal-header/portal-header.component';
import { PortalSidebarComponent } from '../portal-layout/portal-sidebar/portal-sidebar.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    CartComponent,
    CategoryComponent,
    ProductComponent,
    CheckoutComponent,
    PortalLayoutComponent,
    PortalHeaderComponent,
    PortalSidebarComponent,
    PortalContentComponent,
    PagesComponent,
    HomeComponent,
    ProfileComponent,
    OrderHistoryComponent,
    CategoryComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }

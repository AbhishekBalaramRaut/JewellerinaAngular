import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PortalContentComponent } from '../portal-layout/portal-content/portal-content.component';
import { PortalFooterComponent } from '../portal-layout/portal-footer/portal-footer.component';
import { PortalHeaderComponent } from '../portal-layout/portal-header/portal-header.component';
import { PortalLayoutComponent } from '../portal-layout/portal-layout.component';
import { PortalSidebarComponent } from '../portal-layout/portal-sidebar/portal-sidebar.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './category/product/product.component';
import { HomeComponent } from './home/home.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';

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
    PortalFooterComponent,
    PagesComponent,
    HomeComponent,
    ProfileComponent,
    OrderHistoryComponent,
    CategoryComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    PagesRoutingModule,
    NgbModule
  ]
})
export class PagesModule { }

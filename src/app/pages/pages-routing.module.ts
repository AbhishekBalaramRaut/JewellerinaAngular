import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './category/product/product.component';
import { HomeComponent } from './home/home.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent, 
        data: {
          label: 'Home',
          breadcrumb: {
            routerLink: '/portal/home',
            level: 1,
            disabled: true,
            label: 'Home',
            styleClass: 'home'
          }
        }
      },
      {
        path: 'home/category',
        component: CategoryComponent,
        data: {
          label: 'Category',
          breadcrumb: {
            routerLink: '/portal/home/category',
            level: 2,
            disabled: true,
            label: 'Category'
          }
        }
      },
      {
        path: 'home/category/product',
        component: ProductComponent,
        data: {
          label: 'Product',
          breadcrumb: {
            routerLink: '/portal/home/product',
            level: 3,
            disabled: true,
            label: 'Product'
          }
        }
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
        data: {
          label: 'Order History',
          breadcrumb: {
            routerLink: '/portal/order-history',
            level: 1,
            disabled: true,
            label: 'Order History'
          }
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          label: 'Profile',
          breadcrumb: {
            routerLink: '/portal/profile',
            level: 1,
            disabled: true,
            label: 'Profile'
          }
        }
      },
      {
        path: 'cart',
        component: CartComponent,
        data: {
          label: 'Cart',
          breadcrumb: {
            routerLink: '/portal/cart',
            level: 1,
            disabled: true,
            label: 'Cart'
          }
        }
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          label: 'Checkout',
          breadcrumb: {
            routerLink: '/portal/checkout',
            level: 1,
            disabled: true,
            label: 'Checkout'
          }
        }
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }

    ]
  },
  {
    path:'../../',
    redirectTo: '/'               
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

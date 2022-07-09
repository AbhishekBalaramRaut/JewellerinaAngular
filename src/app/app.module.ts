import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PortalLayoutComponent } from './portal-layout/portal-layout.component';
import { PortalHeaderComponent } from './portal-layout/portal-header/portal-header.component';
import { PortalSidebarComponent } from './portal-layout/portal-sidebar/portal-sidebar.component';
import { PortalContentComponent } from './portal-layout/portal-content/portal-content.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { CategoryComponent } from './pages/home/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalLayoutComponent,
    PortalHeaderComponent,
    PortalSidebarComponent,
    PortalContentComponent,
    PagesComponent,
    HomeComponent,
    ProfileComponent,
    OrderHistoryComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

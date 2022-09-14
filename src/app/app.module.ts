import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { PagesModule } from './pages/pages.module';
import { ModalWindowComponent } from './shared/utils/modal-window/modal-window.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    LoginModule,
    NgbModule
  ],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: AuthInterceptor,  
      multi: true  
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from './shared/services/loader/spinner.service';
import { LoginService } from './shared/services/pages/login.service';
import { ModalWindowComponent } from './shared/utils/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  urlsNotToUse: string[] = [];
  alreadyExpired = false;
  modalOptions: NgbModalOptions = {
    centered: true,
    windowClass: 'modalWindow',
    backdrop: 'static',
    keyboard: false,
    ariaLabelledBy: 'modal-basic-title',
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService,
    private spinnerService: SpinnerService
  ) {
    this.urlsNotToUse = ['signIn', 'signUp', 'sendOtp'];
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.alreadyExpired = false;

    if (this.isNotTokenBased(request.url)) {
      let req = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
      this.spinnerService.requestStarted();
      return next.handle(req).pipe(
        tap(
          (evt) => {
            if (evt instanceof HttpResponse) {
              this.spinnerService.requestEnded();
              if (evt['body']) {
                if (evt['body']['code'] == 401) {
                }
              }
            }
          },
          (error: HttpErrorResponse) => {
            this.spinnerService.resetSpinner();
            throw error;
          }
        )
      );
    } else {
      let token = sessionStorage.getItem('accessToken');
      let req = request.clone({
        setHeaders: {
          accessToken: '' + token,
        },
      });
      this.spinnerService.requestStarted();
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
          let errorMsg = '';
          if (error.status == 401) {
            if (!this.alreadyExpired) {
              this.alreadyExpired = true;
              sessionStorage.removeItem('accessToken');
              const modalRef = this.modalService.open(
                ModalWindowComponent,
                this.modalOptions
              );

              modalRef.componentInstance.modalData = {
                modalHeader: 'Session Invalid',
                modalText: 'Your session has expired. You need to relogin.',
                actions: ['Ok'],
                hideClose: true,
              };

              modalRef.result
                .then(
                  (data) => {
                    this.alreadyExpired = false;
                    this.loginService.logout();
                    this.router.navigate(['/']);
                  },
                  () => {
                    this.alreadyExpired = false;
                    this.loginService.logout();
                    this.router.navigate(['/']);
                  }
                )
                .catch((error) => {
                  console.log('error', error);
                });
            }
          }
          return throwError(errorMsg);
        }),
        tap(
          (evt) => {
            if (evt instanceof HttpResponse) {
              this.spinnerService.requestEnded();
              if (evt['body']) {
                if (evt['body']['code'] == 401) {
                }
              }
            }
          },
          (error: HttpErrorResponse) => {
            this.spinnerService.resetSpinner();
            throw error;
          }
        )
      );
    }
  }

  private isNotTokenBased(reqUrl: string) {
    let url: string[] = reqUrl.split('/');
    let indexPara = url[url.length - 1];
    let position = this.urlsNotToUse.indexOf(indexPara);

    if (position > -1) {
      return true;
    }
    return false;
  }

  showModalWindow() {}
}

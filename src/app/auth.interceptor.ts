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
import { ModalWindowComponent } from './shared/utils/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  urlsNotToUse: string[] = [];

  modalOptions: NgbModalOptions = {
    centered: true,
    windowClass: 'modalWindow',
    backdrop: 'static',
    keyboard: false,
    ariaLabelledBy: 'modal-basic-title',
  };

  constructor(private modalService: NgbModal, private router: Router) {
    this.urlsNotToUse = ['signIn', 'signUp'];
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isNotTokenBased(request.url)) {
      return next.handle(request);
    } else {
      let token = sessionStorage.getItem('accessToken');
      let req = request.clone({
        setHeaders: {
          accessToken: '' + token,
        },
      });
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.status == 401) {
            sessionStorage.removeItem('accessToken');
            const modalRef = this.modalService.open(
              ModalWindowComponent,
              this.modalOptions
            );

            modalRef.componentInstance.modalData = {
              modalHeader: 'Session Invalid',
              modalText: 'Your session has expired. You need to relogin.',
              actions: ['Ok'],
            };

            modalRef.result
              .then(
                (data) => {
                  this.router.navigate(['/']);
                },
                () => {
                  this.router.navigate(['/']);
                }
              )
              .catch((error) => {
                console.log('error', error);
              });
          }
          return throwError(errorMsg);
        }),
        tap((evt) => {
          if (evt instanceof HttpResponse) {
            if (evt['body']) {
              if (evt['body']['code'] == 401) {
              }
            }
          }
        })
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

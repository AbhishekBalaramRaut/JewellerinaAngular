import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Properties } from '../../utils/properties';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  signInUrl = Properties.domain + '/signIn';
  constructor(private http: HttpClient) {}

  signIn(crdentials: any) {
    return this.http.post<any>(this.signInUrl, crdentials);
  }
}

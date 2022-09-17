import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Properties } from '../../utils/properties';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  signInUrl = Properties.domain + '/signIn';
  profileUrl = Properties.domain + '/profile';
  updateCustomerUrl = Properties.domain + '/updateCustomer';
  profile: any;

  constructor(private http: HttpClient) {}

  signIn(crdentials: any) {
    return this.http.post<any>(this.signInUrl, crdentials);
  }

  getProfile() {
    return this.http.get<any>(this.profileUrl);
  }

  updateCustomer(customer: any) {
    return this.http.post<any>(this.updateCustomerUrl, customer);
  }

  getProfileNoCall() {
    if (this.profile) {
      return this.profile;
    }
    let prof = sessionStorage.getItem('profile');
    if (prof) {
      return JSON.parse(prof);
    }
    return null;
  }

  setProfile(profile: any) {
    this.profile = profile;
    sessionStorage.setItem('profile', JSON.stringify(profile));
  }

  logout() {
    this.profile = null;
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('menuItems');
    sessionStorage.removeItem('accessToken');
  }
}

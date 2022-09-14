import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Properties } from '../../utils/properties';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderHistoryUrl = Properties.domain + '/order';
  cart: any[] = [];
  cartUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<any>(this.orderHistoryUrl);
  }

  resetCart(cartObject: any) {
    this.cart = cartObject;
    this.cartUpdated.next(this.cart);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Properties } from '../../utils/properties';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderHistoryUrl = Properties.domain + '/order';
  orderDetailUrl = Properties.domain + '/order';
  placeOrderUrl = Properties.domain + '/order';
  cancelOrderUrl = Properties.domain + '/order';
  cart: any[] = [];
  cartUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<any>(this.orderHistoryUrl);
  }

  getOrder(id: any) {
    return this.http.get<any>(this.orderDetailUrl + '/' + id);
  }

  resetCart(cartObject: any[]) {
    this.cart = cartObject;
    this.cartUpdated.next(this.cart);
    sessionStorage.setItem('cart', JSON.stringify(cartObject));
  }

  getCart() {
    if (this.cart && this.cart.length > 0) {
      return this.cart;
    }
    let cart = sessionStorage.getItem('cart');
    if (cart && cart.length > 0) {
      return JSON.parse(cart);
    }
    return [];
  }

  placeOrder(order: any) {
    return this.http.post<any>(this.placeOrderUrl, order);
  }

  cancelOrder(id: any) {
    return this.http.delete<any>(this.cancelOrderUrl + '/' + id);
  }
}

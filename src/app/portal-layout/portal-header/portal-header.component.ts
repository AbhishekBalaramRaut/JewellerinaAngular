import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/pages/order.service';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss'],
})
export class PortalHeaderComponent implements OnInit {
  cart: any[] = [];
  count: any = 0;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.cartUpdated.subscribe((cart: any) => {
      this.count = 0;
      this.cart = cart;

      this.cart.forEach((category) => {
        category['items'].forEach((item: any, index: any) => {
          this.count = this.count + 1;
        });
      });
    });
  }

  showCart() {
    this.router.navigate(['portal/cart']);
  }

  logout() {
    alert('redirect to login');
  }
}

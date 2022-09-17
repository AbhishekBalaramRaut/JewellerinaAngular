import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/pages/login.service';
import { OrderService } from 'src/app/shared/services/pages/order.service';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss'],
})
export class PortalHeaderComponent implements OnInit {
  cart: any[] = [];
  count: any = 0;
  profile: any = null;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    let prof = this.loginService.getProfileNoCall();
    if (!prof) {
      this.loginService.getProfile().subscribe((profile) => {
        this.profile = profile['result'];
        this.loginService.setProfile(this.profile);
      });
    } else {
      this.profile = prof;
    }

    this.orderService.cartUpdated.subscribe((cart: any) => {
      this.count = 0;
      this.cart = cart;

      this.cart.forEach((category) => {
        category['items'].forEach((item: any, index: any) => {
          this.count = this.count + 1;
        });
      });
    });
    let cart = this.orderService.getCart();
    if (cart && cart.length > 0) this.orderService.resetCart(cart);
  }

  showCart() {
    this.router.navigate(['portal/cart']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}

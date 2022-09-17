import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/pages/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  itemCount: any = 0;
  total: any = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.cartUpdated.subscribe((cart: any) => {
      this.itemCount = 0;
      this.cart = cart;

      this.cart.forEach((category) => {
        category['items'].forEach((item: any, index: any) => {
          this.itemCount = this.itemCount + 1;
        });
      });
    });
    let cart = this.orderService.getCart();
    if (cart && cart.length > 0) this.orderService.resetCart(cart);

    this.cart.forEach((category) => {
      category['items'].forEach((item: any) => {
        this.total = this.total + item['price'] * item['quantity'];
        this.itemCount = this.itemCount + 1;

        item['imagePath'] =
          'assets/images/jewellery/' +
          category['categoryCode'] +
          '/' +
          item['image'];
      });
    });
    this.orderService.resetCart(this.cart);
  }

  orderPreview() {
    this.router.navigate(['checkout'], { relativeTo: this.activatedRoute });
  }

  removeItem(categoryR: any, itemR: any) {
    this.cart.forEach((category) => {
      if (category['id'] == categoryR['id']) {
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == itemR['id']) {
            this.total = this.total - item['price'] * item['quantity'];
            this.itemCount = this.itemCount - 1;

            category['items'] = category['items'].filter(
              (item: any) => item['id'] != itemR['id']
            );

            if (category['items'].length == 0) {
              category['removed'] = true;
            }
            return;
          }
        });
      }
    });

    this.cart = this.cart.filter((category: any) => !category['removed']);

    this.orderService.resetCart(this.cart);
  }

  incrementQuantity(categoryR: any, itemR: any) {
    this.cart.forEach((category) => {
      if (category['id'] == categoryR['id']) {
        let zeroQuantity = false;
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == itemR['id']) {
            this.total = this.total + item['price'];
            item['quantity'] = item['quantity'] + 1;

            return;
          }
        });
      }
    });
    this.orderService.resetCart(this.cart);
  }

  decrementQuantity(categoryR: any, itemR: any) {
    this.cart.forEach((category) => {
      if (category['id'] == categoryR['id']) {
        let zeroQuantity = false;
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == itemR['id']) {
            this.total = this.total - item['price'];
            item['quantity'] = item['quantity'] - 1;

            if (item['quantity'] == 0) {
              this.itemCount = this.itemCount - 1;
              item['zeroQuantity'] = true;
            }
            return;
          }
        });
        category['items'] = category['items'].filter(
          (item: any) => !item['zeroQuantity']
        );

        if (category['items'].length == 0) {
          category['removed'] = true;
        }
      }
    });

    this.cart = this.cart.filter((category: any) => !category['removed']);
    this.orderService.resetCart(this.cart);
  }
}

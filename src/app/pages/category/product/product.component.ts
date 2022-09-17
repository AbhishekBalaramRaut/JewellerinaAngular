import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/pages/category.service';
import { OrderService } from 'src/app/shared/services/pages/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  item: any = null;
  itemId: any = null;
  categoryId: any = null;
  categoryCode: any = null;
  categoryName: any = null;
  cart: any[] = [];
  quantity: any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.itemId = params['itemId'];
      this.categoryId = params['categoryId'];
      this.categoryCode = params['categoryCode'];
      this.categoryName = params['categoryName'];

      this.categoryService.getItemById(this.itemId).subscribe((data) => {
        this.item = data['result'] ? data['result'] : null;
        this.item['imagePath'] =
          'assets/images/jewellery/' +
          this.categoryCode +
          '/' +
          this.item['image'];

        this.findInCart();
      });
    });

    this.orderService.cartUpdated.subscribe((cart: any) => {
      this.cart = cart;
      this.findInCart();
    });
  }

  findInCart() {
    this.cart = this.orderService.getCart();
    this.quantity = 0;
    if (this.cart && this.cart.length > 0) {
      this.cart.forEach((category) => {
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == this.item['id']) {
            this.quantity = item['quantity'];
          }
        });
      });
    }
  }

  navigateToCategory() {
    this.router.navigate(['../'], {
      queryParams: {
        categoryId: this.categoryId,
      },
      relativeTo: this.route,
    });
  }

  minusFromcart() {
    this.cart.forEach((category) => {
      if (category['id'] == this.categoryId) {
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == this.item['id']) {
            if (item['quantity'] > 1) {
              item['quantity'] = item['quantity'] - 1;
              this.quantity = item['quantity'];
            } else {
              item['toBeRemoved'] = true;
            }
          }
        });
        category['items'] = category['items'].filter(
          (item: any) => !item['toBeRemoved']
        );
      }
    });

    this.orderService.resetCart(this.cart);
  }

  addTocart() {
    let catFound = false;
    let itemFound = false;

    this.cart.forEach((category) => {
      if (category['id'] == this.categoryId) {
        catFound = true;
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == this.item['id']) {
            itemFound = true;
            this.quantity++;
            item['quantity'] = this.quantity;
            this.orderService.resetCart(this.cart);
          }
        });
      }
    });
    if (!catFound) {
      this.cart.push({
        id: this.categoryId,
        name: this.categoryName,
        image: 'category.jpg',
        categoryCode: this.categoryCode,
        items: [{ ...this.item, quantity: 1 }],
      });
      this.orderService.resetCart(this.cart);
      return;
    }

    if (catFound && !itemFound) {
      this.cart.forEach((category) => {
        if (category['id'] == this.categoryId) {
          category['items'].push({ ...this.item, quantity: 1 });
        }
      });
      this.orderService.resetCart(this.cart);
      return;
    }
  }
}

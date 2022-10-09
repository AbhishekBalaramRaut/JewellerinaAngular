import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/pages/category.service';
import { OrderService } from 'src/app/shared/services/pages/order.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: any = null;
  categoryId: any = null;
  cart: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let categories = this.categoryService.categories;

    this.route.queryParams.subscribe((params) => {
      if (!params['categoryId']) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
      this.categoryId = params['categoryId'];
    });

    if (!this.category || this.category.length == 0) {
      this.categoryService.getCategories().subscribe((data) => {
        categories = data['result'] ? data['result'] : [];
        categories.forEach((category) => {
          category['imagePath'] =
            'assets/images/jewellery/' +
            category['categoryCode'] +
            '/category.jpg';
        });
        this.categoryService.categories = categories;
        this.findInCategories(categories);
      });
    } else {
      this.findInCategories(categories);
    }
  }

  findInCategories(categories: any) {
    categories.forEach((category: any) => {
      if (this.categoryId == category['id']) {
        this.category = category;

        this.category['items'].forEach((item: any) => {
          if (!item['quantity']) {
            item['quantity'] = 0;
          }
          item['imagePath'] =
            'assets/images/jewellery/' +
            category['categoryCode'] +
            '/' +
            item['image'];
        });
        this.findInCart();
      }
    });

    this.orderService.cartUpdated.subscribe((cart: any) => {
      this.cart = cart;
      this.findInCart();
    });
  }

  cartItems: any[] = [];

  findInCart() {
    this.cart = this.orderService.getCart();

    if (this.cart && this.cart.length > 0) {
      this.cart.forEach((category) => {
        if (this.categoryId == category['id']) {
          this.cartItems = category['items'];
          category['items'].forEach((item: any, index: any) => {
            this.category['items'].forEach((itemC: any) => {
              if (itemC['id'] == item['id']) {
                itemC['quantity'] = item['quantity'];
              }
            });
          });
        }
      });
    }
  }

  minusFromcart(itemA?: any) {
    this.cart.forEach((category) => {
      if (category['id'] == this.categoryId) {
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == itemA['id']) {
            if (item['quantity'] > 1) {
              item['quantity'] = item['quantity'] - 1;
              itemA['quantity'] = item['quantity'];
            } else {
              itemA['quantity'] = 0;
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

  addTocart(itemA?: any) {
    let catFound = false;
    let itemFound = false;

    this.cart.forEach((category) => {
      if (category['id'] == this.categoryId) {
        catFound = true;
        category['items'].forEach((item: any, index: any) => {
          if (item['id'] == itemA['id']) {
            itemFound = true;
            item['quantity']++;
            itemA['quantity'] = item['quantity'];
            this.orderService.resetCart(this.cart);
          }
        });
      }
    });
    if (!catFound) {
      this.cart.push({
        id: this.categoryId,
        name: this.category['name'],
        image: 'category.jpg',
        categoryCode: this.category['categoryCode'],
        items: [{ ...itemA, quantity: 1 }],
      });
      this.orderService.resetCart(this.cart);
      return;
    }

    if (catFound && !itemFound) {
      this.cart.forEach((category) => {
        if (category['id'] == this.categoryId) {
          category['items'].push({ ...itemA, quantity: 1 });
        }
      });
      this.orderService.resetCart(this.cart);
      return;
    }
  }

  openItem(itemId: any) {
    this.router.navigate(['product'], {
      queryParams: {
        itemId: itemId,
        categoryId: this.categoryId,
        categoryCode: this.category['categoryCode'],
        categoryName: this.category['name'],
      },
      relativeTo: this.route,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CategoryService } from 'src/app/shared/services/pages/category.service';
import { OrderService } from 'src/app/shared/services/pages/order.service';
import { ModalWindowComponent } from 'src/app/shared/utils/modal-window/modal-window.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  cart: any[] = [];
  itemCount: any = 0;
  total: any = 0;
  orderDetail: any = null;
  categories: any[] = [];

  statuses: any[] = [
    { status: 1, description: 'Yet to be delivered', state: 'Order Placed' },
    { status: 2, description: 'In Progress', state: 'In Progress' },
    { status: 3, description: 'Completed', state: 'Completed' },
    { status: 4, description: 'Cancelled', state: 'Cancelled' },
  ];

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    ariaLabelledBy: 'modal-basic-title',
    centered: true,
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.categories;
    this.route.queryParams.subscribe((params) => {
      this.orderId = params['orderId'];

      if (!this.categories || this.categories.length == 0) {
        this.categoryService.getCategories().subscribe((data) => {
          this.categories = data['result'] ? data['result'] : [];
          this.categories.forEach((category) => {
            category['imagePath'] =
              'assets/images/jewellery/' +
              category['categoryCode'] +
              '/category.jpg';

            category['items'].forEach((item: any) => {
              item['imagePath'] =
                'assets/images/jewellery/' +
                category['categoryCode'] +
                '/' +
                item['image'];
            });
          });
          this.categoryService.categories = this.categories;

          this.prepareCart();
        });
      } else {
        this.categories.forEach((category) => {
          category['imagePath'] =
            'assets/images/jewellery/' +
            category['categoryCode'] +
            '/category.jpg';

          category['items'].forEach((item: any) => {
            item['imagePath'] =
              'assets/images/jewellery/' +
              category['categoryCode'] +
              '/' +
              item['image'];
          });
        });
        this.prepareCart();
      }
    }); //route ends
  }

  orderId = '';
  status: any;

  prepareCart() {
    this.orderService.getOrder(this.orderId).subscribe((data) => {
      this.orderDetail = data['result'] ? data['result'] : null;
      this.orderDetail.orderDate = moment(this.orderDetail['orderDate']).format(
        'DD-MMM-yyyy'
      );
      this.status = this.statuses.find(
        (st) => st['status'] == this.orderDetail['status']
      );
      this.cart = [];
      this.orderDetail['items'].forEach((item: any) => {
        let category = this.categories.find(
          (cat) => cat['id'] == item['item']['categoryId']
        );
        let foundCat = false;
        this.cart.forEach((cat: any) => {
          if (cat['id'] == category['id']) {
            foundCat = true;
          }
        });
        if (!foundCat) {
          this.cart.push(category);
        }
      });
      this.orderDetail['items'].forEach((item: any) => {
        this.cart.forEach((cat: any) => {
          if (item['item']['categoryId'] == cat['id']) {
            cat['items'].forEach((itemC: any) => {
              if (itemC['id'] == item['item']['id']) {
                itemC['found'] = true;
                itemC['quantity'] = +item['quantity'];
              }
            });
          }
        });

        this.cart.forEach((cat: any) => {
          if (item['item']['categoryId'] == cat['id']) {
            cat['items'] = cat['items'].filter((item: any) => item['found']);
          }
        });

        console.log(this.cart);
      });
      this.cart.forEach((category) => {
        category['items'].forEach((item: any) => {
          this.total = this.total + item['price'] * item['quantity'];
          this.itemCount = this.itemCount + 1;
        });
      });
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  disableConfirm = false;

  handleError(msg?: any) {
    const modalRef = this.modalService.open(
      ModalWindowComponent,
      this.modalOptions
    );

    modalRef.componentInstance.modalData = {
      modalHeader: 'Order Failed',
      modalText: msg ? msg : 'Order could not be placed. Please try later',
      actions: ['Ok'],
      hideClose: true,
    };

    modalRef.result
      .then(
        (data: any) => {},
        () => {}
      )
      .catch((error: any) => {
        console.log('error', error);
      });
  }
}

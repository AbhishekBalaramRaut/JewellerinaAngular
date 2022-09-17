import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/shared/services/pages/order.service';
import { ModalWindowComponent } from 'src/app/shared/utils/modal-window/modal-window.component';
import { Properties } from 'src/app/shared/utils/properties';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  itemCount: any = 0;
  total: any = 0;
  @ViewChild('confirm') confirmModal: any;

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    ariaLabelledBy: 'modal-basic-title',
    centered: true,
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
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

  orderId = '';
  confirmOrder(result: any) {
    this.orderId = result['id'];
    this.modalService.open(this.confirmModal, this.modalOptions).result.then(
      (result) => {
        this.router.navigate(['portal/order-history']);
      },
      (reason) => {}
    );
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

  placeOrder() {
    let items: any[] = [];
    this.disableConfirm = true;
    this.cart.forEach((category) => {
      category['items'].forEach((item: any) => {
        items.push({
          quantity: item['quantity'],
          item: {
            id: item['id'],
          },
        });
      });
    });

    console.log(items);

    this.orderService.placeOrder({ items: items }).subscribe((res) => {
      if (res['code'] == Properties.succesCode) {
        this.cart = [];
        this.orderService.resetCart(this.cart);
        this.confirmOrder(res['result']);
      } else {
        this.handleError(res['message']);
      }
    });
  }

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

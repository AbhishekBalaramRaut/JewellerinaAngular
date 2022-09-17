import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { OrderService } from 'src/app/shared/services/pages/order.service';
import { ModalWindowComponent } from 'src/app/shared/utils/modal-window/modal-window.component';
import { Properties } from 'src/app/shared/utils/properties';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

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
    private orderService: OrderService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((res) => {
      console.log('api call was successful');
      console.log(res);
      let result = res['result'];
      result.forEach((order: any) => {
        let description: any = '';

        if (order['items'].length == 1) {
          description = order['items'][0]['item']['name'];
        } else {
          description =
            order['items'][0]['item']['name'].substring(0, 12) +
            '... and ' +
            (order['items'].length - 1) +
            ' more';
        }

        let status: any = this.statuses.find(
          (st) => st['status'] == order['status']
        );

        this.orders.push({
          id: order['id'],
          status: status['state'],
          statusCode: status['status'],
          date: moment(order['orderDate']).format('DD-MMM-yyyy'),
          items: description,
          delivery: status['description'],
          payment: order['payment'] ? 'Paid' : 'Unpaid',
        });
      });
    });
  }

  expandOrder(orderId: any) {
    console.log(orderId);
    this.orders.forEach((order) => {
      if (orderId == order['id']) {
        order['expand'] = !order['expand'];
      } else {
        order['expand'] = false;
      }
    });
  }

  cancelOrderDialog(id?: any) {
    const modalRef = this.modalService.open(
      ModalWindowComponent,
      this.modalOptions
    );

    modalRef.componentInstance.modalData = {
      modalHeader: 'Cancel Order',
      modalText: 'Are you sure you want to cancel order #' + id + ' ?',
      actions: ['Ok'],
    };

    modalRef.result
      .then(
        (data: any) => {
          this.cancelOrder(id);
        },
        () => {}
      )
      .catch((error: any) => {
        console.log('error', error);
      });
  }

  cancelOrder(id?: any) {
    this.orderService.cancelOrder(id).subscribe((res: any) => {
      if (res['code'] == Properties.succesCode) {
        this.cancelSuccess(id);
        this.orders = [];
        this.getOrders();
      } else {
        this.handleError(res['message']);
      }
    });
  }

  cancelSuccess(id?: any) {
    const modalRef = this.modalService.open(
      ModalWindowComponent,
      this.modalOptions
    );

    modalRef.componentInstance.modalData = {
      modalHeader: 'Order Cancelled',
      modalText: 'Order #' + id + ' is cancelled successfully',
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

  handleError(msg?: any) {
    const modalRef = this.modalService.open(
      ModalWindowComponent,
      this.modalOptions
    );

    modalRef.componentInstance.modalData = {
      modalHeader: 'Order Cancellation Failed',
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

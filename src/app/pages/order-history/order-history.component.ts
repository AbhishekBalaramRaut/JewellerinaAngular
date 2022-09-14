import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/pages/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      console.log('api call was successful');
      console.log(orders);

      // [
      //   {
      //   "id":1,
      //   "mobile":"7021719654",
      //   "status":"1",
      //   "orderDate":1651518913069,
      //   "items":[
      //   {
      //   "id":1,
      //   "status":"1",
      //   "quantity":"4",
      //   "item":{
      //   "id":1,
      //   "name":"Bindi",
      //   "description":"Floral Bindi",
      //   "image":"1-12.png",
      //   "price":100
      //   }
      //   },
      //   {
      //   "id":2,
      //   "status":"1",
      //   "quantity":"2",
      //   "item":{
      //   "id":2,
      //   "name":"Earrings",
      //   "description":"Floral earrings",
      //   "image":"haldi-earrings.png",
      //   "price":150
      //   }
      //   }
      //   ]
      //   }
      //   ]
    });
    this.orders = [
      {
        id: 22,
        status: 'In Progress',
        date: '22-Aug-2022',
        items: 'Moti broach .. and 3 more',
        delivery: 'Yet to be delivered',
        payment: 'Unpaid',
      },
      {
        id: 25,
        status: 'Completed',
        date: '21-Aug-2022',
        items: 'Moti broach .. and 3 more',
        delivery: 'Delivered',
        payment: 'Paid',
      },
    ];
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
}

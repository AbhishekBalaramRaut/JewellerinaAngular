import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders:any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.orders = [
    {
      'id': 22,
      'status': 'In Progress',
      'date': '22-Aug-2022',
      'items': "Moti broach .. and 3 more",
      'delivery': 'Yet to be delivered',
      'payment': 'Unpaid'
    },
    {
      'id': 25,
      'status': 'Completed',
      'date': '21-Aug-2022',
      'items': "Moti broach .. and 3 more",
      'delivery': 'Delivered',
      'payment': 'Paid'
    }
    
  ]; 

  }
  

  expandOrder(orderId:any) {
    console.log(orderId);
    this.orders.forEach(order => {

      if(orderId == order['id']) {
        order['expand'] = !order['expand'];
      } else {
        order['expand'] = false;
      }
      
    });

  }
}

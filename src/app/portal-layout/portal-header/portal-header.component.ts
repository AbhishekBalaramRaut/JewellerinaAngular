import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss']
})
export class PortalHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showCart() {
    this.router.navigate(['portal/cart']);
  }

  logout() {
    alert('redirect to login');
  }
}

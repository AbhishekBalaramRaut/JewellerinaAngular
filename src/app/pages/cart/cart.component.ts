import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  orderPreview() {
    this.router.navigate(['checkout'], {relativeTo: this.activatedRoute});
  }
}

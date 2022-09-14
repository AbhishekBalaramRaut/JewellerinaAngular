import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/pages/category.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.itemId = params['itemId'];
      this.categoryId = params['categoryId'];
      this.categoryCode = params['categoryCode'];

      this.categoryService.getItemById(this.itemId).subscribe((data) => {
        this.item = data['result'] ? data['result'] : null;
        this.item['imagePath'] =
          'assets/images/jewellery/' +
          this.categoryCode +
          '/' +
          this.item['image'];
      });
    });
  }

  navigateToCategory() {
    this.router.navigate(['../'], {
      queryParams: {
        categoryId: this.categoryId,
      },
      relativeTo: this.route,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/pages/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: any = null;
  categoryId: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
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
          item['imagePath'] =
            'assets/images/jewellery/' +
            category['categoryCode'] +
            '/' +
            item['image'];
        });
      }
    });
  }

  openItem(itemId: any) {
    this.router.navigate(['product'], {
      queryParams: {
        itemId: itemId,
        categoryId: this.categoryId,
        categoryCode: this.category['categoryCode'],
      },
      relativeTo: this.route,
    });
  }
}

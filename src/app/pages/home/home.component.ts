import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/pages/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data['result'] ? data['result'] : [];
      this.categories.forEach((category) => {
        category['imagePath'] =
          'assets/images/jewellery/' +
          category['categoryCode'] +
          '/category.jpg';
      });
      this.categoryService.categories = this.categories;
    });
  }

  openCategory(categoryId: any) {
    this.router.navigate(['category'], {
      queryParams: { categoryId: categoryId },
      relativeTo: this.activatedRoute,
    });
  }
}

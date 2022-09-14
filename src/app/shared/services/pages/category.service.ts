import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Properties } from '../../utils/properties';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesUrl = Properties.domain + '/categories';
  itemUrl = Properties.domain + '/item';
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(this.categoriesUrl);
  }

  getItemById(itemId: any) {
    return this.http.get<any>(this.itemUrl + '/' + itemId);
  }
}

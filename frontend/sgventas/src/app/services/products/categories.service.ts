import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/products';
import { CategoryPagination } from 'src/app/interfaces/brands.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  headers = new HttpHeaders()

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append('authorization', `Bearer ${localStorage.getItem('token')}`)
  }

  get_brands_no_paginate(): Observable<Category[]>{

    return this.http.get<Category[]>(`${environment.urlBase}/products/api/v1/categories/api/get_no_paginated/`, {headers: this.headers})
  }

  get_categories(): Observable<CategoryPagination>{
    return this.http.get<CategoryPagination>(`${environment.urlBase}/products/api/v1/categories/api/`, { headers: this.headers })
  }

  set_category(form:any){
    return this.http.post(`${environment.urlBase}/products/api/v1/categories/api/`, form, {headers: this.headers})
  } 

  delete_category(id: any){
    return this.http.delete(`${environment.urlBase}/products/api/v1/categories/api/${id}/`, {headers: this.headers})
  }

  update_category(id:any, form:any){
    return this.http.put(`${environment.urlBase}/products/api/v1/categories/api/${id}/`,form, {headers: this.headers})
  }

}

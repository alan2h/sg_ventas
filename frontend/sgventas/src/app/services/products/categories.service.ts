import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/products';

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

    return this.http.get<Category[]>(`${environment.urlBase}/products/api/v1/categories/get_no_paginated/`, {headers: this.headers})
  }

}

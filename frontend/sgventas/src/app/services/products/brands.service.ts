import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Brand } from 'src/app/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  headers = new HttpHeaders()

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append('authorization', `Bearer ${localStorage.getItem('token')}`)
  }

  get_brands_no_paginated(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${environment.urlBase}/products/api/v1/brand/get_no_paginated/`, {headers: this.headers})
  }

}

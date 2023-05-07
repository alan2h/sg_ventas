import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductList } from '../interfaces/products';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers = new HttpHeaders()

  constructor(
    private http: HttpClient
  ) {
    this.headers=this.headers.append('authorization', `Bearer ${localStorage.getItem('token')}`)  
   }


  getAll(): Observable<ProductList>{
    return this.http.get<ProductList>(`${environment.urlBase}/products/api/v1/`, {'headers': this.headers })
  }

  setProduct(form:any) {
    return this.http.post(`${environment.urlBase}/products/api/v1/`, form, {'headers': this.headers})
  }

}

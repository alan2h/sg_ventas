import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, ProductList } from '../interfaces/products';
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

  getOne(id:any): Observable<Product>{
    return this.http.get<Product>(`${environment.urlBase}/products/api/v1/${id}/`, {'headers': this.headers})
  } 

  getAll(): Observable<ProductList>{
    return this.http.get<ProductList>(`${environment.urlBase}/products/api/v1/`, {'headers': this.headers })
  }

  getbyUrl(url:string | null): Observable<ProductList>{
    if (url == null) url = `${environment.urlBase}/products/api/v1/`, {'headers': this.headers }
    return this.http.get<ProductList>(url, {'headers': this.headers})
  }

  setProduct(form:any) {
    return this.http.post(`${environment.urlBase}/products/api/v1/`, form, {'headers': this.headers})
  }

  deleteProduct(id:number){
    return this.http.delete(`${environment.urlBase}/products/api/v1/${id}/`, {'headers': this.headers})
  }

  updateProduct(id: number, body:any){
    return this.http.put(`${environment.urlBase}/products/api/v1/${id}/`, body, {headers: this.headers} )
  }

  searchProduct(field:string, value:string): Observable<ProductList>{
    return this.http.get<ProductList>(`${environment.urlBase}/products/api/v1/?${field}=${value}`, {'headers': this.headers})
  }

}

import { Injectable } from '@angular/core';
import { InoviceInterface, Product, ProductSelected } from '../interfaces/products';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public productsSelected: Product[] = [];

  public total: number = 0.0;

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {
    this.headers = this.headers.append('authorization', `Bearer ${localStorage.getItem('token')}`)
   }

  addProductSelected(productSelected: Product) {
    //this add in memory product selected
    this.productsSelected.push(productSelected);
  }

  addTotal(total: number): void{ this.total += total; }
  removeTotal(total: any): void{
    this.total -= total;

  }

  removeAllProductSelected(): void{ this.productsSelected = []; }

  getTotal():number { return this.total }

  getProductSelected(): Product[]{
    // recover list of products selected
    return this.productsSelected;
  }

  removeProductSelected(productSelected: Product) {
    // remove product selected from memory
    this.productsSelected = this.productsSelected.filter(p => p.id!== productSelected.id);
    this.removeTotal(productSelected.total_price);
  }

  setSalesService(form: any):Observable<InoviceInterface>{
    return this.http.post<InoviceInterface>(`${environment.urlBase}/sales/api/v1/`, form, {headers: this.headers})
  }

}

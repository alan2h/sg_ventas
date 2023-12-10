import { Injectable } from '@angular/core';
import { Product, ProductSelected } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public productsSelected: Product[] = [];

  public total: number = 0.0;

  constructor() { }

  addProductSelected(productSelected: Product) {
    //this add in memory product selected
    this.productsSelected.push(productSelected);
  }

  addTotal(total: number): void{ this.total += total; }
  removeTotal(total: any): void{
    this.total -= total;

  }

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

}

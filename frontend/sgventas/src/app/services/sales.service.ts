import { Injectable } from '@angular/core';
import { Product, ProductSelected } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public productsSelected: Product[] = [];

  constructor() { }

  addProductSelected(productSelected: Product) {
    //this add in memory product selected
    this.productsSelected.push(productSelected);
  }

  getProductSelected(): Product[]{
    // recover list of products selected
    return this.productsSelected;
  }

}

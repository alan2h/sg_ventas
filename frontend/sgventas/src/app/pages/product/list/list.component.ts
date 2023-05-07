import { Component, OnInit } from '@angular/core';
import { ProductList, Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list:ProductList = {
    count:    0,
    next:     null,
    previous: null,
    results:  []
}

 products:Product[] = []

  constructor(
    private product_service: ProductsService
  ) { }

  ngOnInit(): void {
    this.product_service.getAll().subscribe(
      (data) => {
        this.list = data;
      }
    )
  }

}

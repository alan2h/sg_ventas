import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/products';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  obs: Subscription | undefined = undefined;
  products: Product[] = []; 

  constructor(
    private product_service: ProductsService
  ) { }

  ngOnInit(): void {
    this.obs = this.product_service.getAll().subscribe(data => {
      this.products = data.results;
    })
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/products';
import { MountedSelectComponent } from '../mounted-select/mounted-select.component';
import { MatDialog } from '@angular/material/dialog';
import { SalesService } from 'src/app/services/sales.service';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  animal: string='';
  name: string='';

  obs: Subscription | undefined = undefined;
  obs_products_selected: Subscription | undefined = undefined;
  products: Product[] = [];
  products_select: Product[] = [];

  constructor(
    private product_service: ProductsService,
    private sale_service: SalesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obs = this.product_service.getbyUrl(null).subscribe(data => {
      this.products = data.results;
      console.log(this.products)
    })

  }

  openDialogMount(item: any): void {
    const dialogRef = this.dialog.open(MountedSelectComponent, {
      data: {item: item },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.loadProducts();
      //this.animal = result;
    });
  }

}

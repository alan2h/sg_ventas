import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/products';
import { MountedSelectComponent } from '../mounted-select/mounted-select.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  animal: string='';
  name: string='';

  obs: Subscription | undefined = undefined;
  products: Product[] = []; 

  constructor(
    private product_service: ProductsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obs = this.product_service.getbyUrl(null).subscribe(data => {
      this.products = data.results;
    })
  }

  openDialogMount(item: any): void {
    const dialogRef = this.dialog.open(MountedSelectComponent, {
      data: {item: item },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

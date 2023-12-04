import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListProductsComponent } from '../list-products/list-products.component';
import { SalesService } from 'src/app/services/sales.service';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  @Input() show: boolean = false;

  public products: Product[] = [];

  public total: number = 0.0;

  constructor(
    private dialog: MatDialog,
    private sale_service: SalesService
  ) { }



  openDialogProductList() {
    const dialogRef = this.dialog.open(ListProductsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.products = this.sale_service.getProductSelected();
      this.total = this.sale_service.getTotal();
      console.log(this.products)
    });
  }

  ngOnInit(): void {

  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() select_type: string = '';
  @Output() updateList: EventEmitter<any> = new EventEmitter();

  public products: Product[] = [];

  public total: number = 0.0;

  public paywith: number = 0;

  public payback: number = 0;

  constructor(
    private dialog: MatDialog,
    private sale_service: SalesService
  ) { }


  changePay(){
    this.total = this.sale_service.getTotal();
    this.payback = this.paywith - this.total;
  }

  openDialogProductList() {
    const dialogRef = this.dialog.open(ListProductsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.products = this.sale_service.getProductSelected();
      this.total = this.sale_service.getTotal();
    });
  }


  removeItem(item: any){
    this.sale_service.removeProductSelected(item);
    this.products = this.sale_service.getProductSelected();
    this.total = this.sale_service.getTotal();
    this.updateList.emit('update list products');
  }

  ngOnInit(): void {

  }



}

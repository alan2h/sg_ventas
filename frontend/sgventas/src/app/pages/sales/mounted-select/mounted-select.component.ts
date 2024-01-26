import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { Product } from 'src/app/interfaces/products';


@Component({
  selector: 'app-mounted-select',
  templateUrl: './mounted-select.component.html',
  styleUrls: ['./mounted-select.component.css'],
})
export class MountedSelectComponent implements OnInit {

  mount: number = 1;
  products: Product[] = [];

  constructor(
    public dialogRef: MatDialogRef<MountedSelectComponent>,
    private sale_service: SalesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.products = this.sale_service.getProductSelected();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMount(){
    console.log(this.products);

    this.data.item.mount = this.mount;
    this.data.item.pk = this.getRandomInt(100)
    this.data.item.total_price = this.mount * this.data.item.price_sale;
    this.sale_service.addProductSelected(this.data.item);
    this.sale_service.addTotal(this.mount * this.data.item.price_sale);
    this.mount = 1;
    this.dialogRef.close();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}

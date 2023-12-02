import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';


@Component({
  selector: 'app-mounted-select',
  templateUrl: './mounted-select.component.html',
  styleUrls: ['./mounted-select.component.css'],
})
export class MountedSelectComponent implements OnInit {

  mount: number = 1;

  constructor(
    public dialogRef: MatDialogRef<MountedSelectComponent>,
    private sale_service: SalesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMount(){
    this.data.item.mount = this.mount;
    this.data.item.total_price = this.mount * this.data.item.price_sale;
    this.sale_service.addProductSelected(this.data.item);
    this.mount = 1;
    this.dialogRef.close();
  }

}

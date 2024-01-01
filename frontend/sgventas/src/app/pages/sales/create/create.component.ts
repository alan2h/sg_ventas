import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products';
import { SalesService } from 'src/app/services/sales.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  show_sale_detail: boolean = false;

  select: string = '';

  public product_selected: Product[] = [];

  constructor(
    private saleService: SalesService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.product_selected = this.saleService.getProductSelected();
  }

  saveSale(){
    //alert('this functonn saved data ');
    let form = {
      'pay_method': this.select,
      'products': this.product_selected
    }
    this.saleService.setSalesService(form).subscribe(data => {
      this.snackBar.open('Venta guardado con exito', 'cerrar');
      this.route.navigate(['/'])
    })
  }

  showDetail(response:any){
    console.log(response);
    this.show_sale_detail = response.show;
    this.select = response.select;
  }

}

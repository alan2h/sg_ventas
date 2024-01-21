import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';

import { ActivatedRoute } from '@angular/router';
import { SaleInterface } from 'src/app/interfaces/sales.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  private id: number|null|undefined|string = 0;
  sale: SaleInterface|null = null;

  constructor(
    private salesService: SalesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.salesService.getSale(this.id?.toString()!).subscribe(sale => {
      console.log(sale);
      this.sale = sale;
    });
  }

}

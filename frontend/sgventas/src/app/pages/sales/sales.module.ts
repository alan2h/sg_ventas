import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './create/create.component';
import { BarSelectionComponent } from './bar-selection/bar-selection.component';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { MountedSelectComponent } from './mounted-select/mounted-select.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    CreateComponent,
    BarSelectionComponent,
    SaleDetailComponent,
    ListProductsComponent,
    MountedSelectComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule
  ]
})
export class SalesModule { }

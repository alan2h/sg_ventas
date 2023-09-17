import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './create/create.component';
import { BarSelectionComponent } from './bar-selection/bar-selection.component';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';
import { ListProductsComponent } from './list-products/list-products.component';

@NgModule({
  declarations: [
    CreateComponent,
    BarSelectionComponent,
    SaleDetailComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
  ]
})
export class SalesModule { }

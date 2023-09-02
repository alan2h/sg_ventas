import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }

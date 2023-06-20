import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { PagesRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';



import { PagesRoutingModule } from './pages-routing.module';
import { BaseComponent } from './shared/base/base.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './error404/error404.component';
// reports
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    BaseComponent,
    SideNavComponent,
    DashboardComponent,
    Error404Component,
    SalesReportComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  exports:[
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule
  ]
})
export class PagesModule { }

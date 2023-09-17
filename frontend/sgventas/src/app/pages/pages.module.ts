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


@NgModule({
  declarations: [
    BaseComponent,
    SideNavComponent,
    DashboardComponent,
    Error404Component,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule
  ],
  exports:[
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesRoutingModule } from './pages-routing.module';
import { BaseComponent } from './shared/base/base.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    BaseComponent,
    SideNavComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports:[
    MatDialogModule,
    MatButtonModule
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    PagesRoutingModule,
    DataTablesModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }

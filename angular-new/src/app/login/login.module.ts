import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import  { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import  { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ForgotPasswordComponent,
  ]
})
export class LoginModule { }

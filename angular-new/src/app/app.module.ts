import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

//login
import { LoginComponent } from './login/login.component';
import  { NeedHelpComponent } from './login/need-help/need-help.component';

//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

//http service
import { HttpModule } from '@angular/http';

//pages
import { PagesModule } from './pages/pages.module';
//toaster modul
import { ToastrModule } from 'toastr-ng2';

//auth guard module
import { AuthGuard } from './_guards/auth.guard';

//pjguard
import { PenanggungJawabGuard } from './_guards/penanggungjawab.guard';

//panitiaguard
import { PanitiaGuard } from './_guards/panitia.guard';

//lightbox 
import { LightboxModule } from 'angular2-lightbox';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    HttpModule,
    ChartsModule,

    BrowserAnimationsModule,
    PagesModule,
    LightboxModule
  ],

  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    


    LoginComponent,
    NeedHelpComponent,
  ],
  providers: [{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
      },
      
      AuthGuard ,
      PenanggungJawabGuard,
      PanitiaGuard
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

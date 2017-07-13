import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

//Login
import  { LoginComponent } from './login/login.component';
import  { NeedHelpComponent } from './login/need-help/need-help.component';


//auth runGuard
import { AuthGuard } from './_guards/auth.guard';
import { PenanggungJawabGuard } from './_guards/penanggungjawab.guard';
import { PanitiaGuard } from './_guards/panitia.guard';

//pages
//import  { P404Component } from './pages/404.component';

export const routes: Routes = [
  {
    path: 'login',
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'need-help',
        component: NeedHelpComponent
      },
      {
        path: 'forgot-password',
        loadChildren: './login/login.module#LoginModule'
      },

    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'pendaftaran',
        loadChildren: './pendaftaran/pendaftaran.module#PendaftaranModule',
        canActivateChild: [PenanggungJawabGuard]
      },
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
        canActivateChild: [PanitiaGuard]

      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

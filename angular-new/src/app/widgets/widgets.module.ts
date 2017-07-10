import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
    Ng2SmartTableModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule {}

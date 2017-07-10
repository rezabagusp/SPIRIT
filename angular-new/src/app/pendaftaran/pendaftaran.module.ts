import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ButtonsComponent } from './buttons.component';
import { CardsComponent } from './cards.component';

import { ModalsComponent } from './modals.component';

// Forms Component
import { FormsComponent } from './forms.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SocialButtonsComponent } from './social-buttons.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Components Routing
import { PendaftaranRoutingModule } from './pendaftaran-routing.module';//ini kudu diubah

//component olahraga
import { SepakBolaComponent } from './olahraga/sepakbola.component';

import { ModalComponent } from '../_directives/index';
         

@NgModule({
  imports: [
    PendaftaranRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ButtonsComponent,
    CardsComponent,
    FormsComponent,
    SocialButtonsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    SepakBolaComponent,
    ModalsComponent,
    ModalComponent,


  ]
})
export class PendaftaranModule { }
